import Promise from "bluebird";
import SendBird from "sendbird";
import {
  find,
  head,
  isEmpty,
  last,
  length,
  propEq,
  reverse,
  split,
  toUpper
} from "ramda";

export let _sb = null;
export let _user = null;

/**
 * Simple utility function to promisify SendBird calls
 * @param {*} fn
 */
export const sbp = fn => new Promise((resolve, reject) =>
  fn((res, err) => (err) ? reject(err) : resolve(res))
);

export const firstNameLastInitial = name => {
  const parts = split(/\s+/, name);
  const firstName = head(parts);
  let lastName = "";
  if (length(parts) > 1) lastName = last(parts);
  const lastInitial = isEmpty(lastName) ? "" : ` ${toUpper(head(lastName))}.`;
  return `${firstName}${lastInitial}`;
};

export const chatNickName = nickname => firstNameLastInitial(nickname);

export const init = async(wallet, nickname) => {
  _sb = new SendBird({appId: "BB1E0777-B8CE-44DF-BA37-63EBA2E858F1"});
  _user = await sbp(cb => _sb.connect(wallet, cb));
  _user = await sbp(cb => _sb.updateCurrentUserInfo(chatNickName(nickname), null, cb));
  return [_sb, _user];
};

export const channels = async(sb = _sb) => {
  const query = sb.OpenChannel.createOpenChannelListQuery();
  return sbp(cb => query.next(cb));
};

export const findChannelByName = (name, channels, sb = _sb) => {
  return find(propEq("name", name), channels);
};

export const getChannelByName = async(name, channel, sb = _sb) => {
  return sbp(cb => sb.OpenChannel.getChannel(channel.url, cb));
};

export const createChannelWithName = async(name, sb = _sb) => {
  return sbp(cb => sb.OpenChannel.createChannel(name, null, null, cb));
};

export const setChannelByName = async(name, channels) => {
  const channel = findChannelByName(name, channels);
  if (!channel) return;
  await sbp(cb => channel.enter(cb));
  return channel;
};

export const messages = async channel => {
  const query = channel.createPreviousMessageListQuery();
  const messages = await sbp(cb => query.load(30, true, cb));
  return reverse(messages);
};

export const sendMessage = async(msg, channel) =>
  sbp(cb => channel.sendUserMessage(msg, null, null, cb));

export const channelNameForLocale = locale => {
  /* Channel locale is always -en, unless the environment is 'production' */
  const channelLocale = process.env.NODE_ENV === "production" ? `-${locale}` : "-en";
  /* Channel names follow this scheme: BitGuild-${env}-${locale}, ex: BitGuild-production-en */
  return `BitGuild-${process.env.NODE_ENV}${channelLocale}`;
};
