import Promise from "bluebird";
import SendBird from "sendbird";
import {defaultLanguage} from "@/shared/constants/language";
import {
  find,
  head,
  isEmpty,
  last,
  length,
  propEq,
  reverse,
  split,
  toUpper,
} from "ramda";


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
  let sb = new SendBird({appId: process.env.SENDBIRD_APP_ID});
  let user = await sbp(cb => sb.connect(wallet, cb));
  user = await sbp(cb => sb.updateCurrentUserInfo(chatNickName(nickname), null, cb));
  return [sb, user];
};

export const channels = async sb => {
  const query = sb.OpenChannel.createOpenChannelListQuery();
  return sbp(cb => query.next(cb));
};

export const findChannelByName = (name, channels, sb) => {
  return find(propEq("name", name), channels);
};

export const getChannelByName = async(name, channel, sb) => {
  return sbp(cb => sb.OpenChannel.getChannel(channel.url, cb));
};

export const createChannelWithName = async(name, operators = null, sb) => {
  return sbp(cb => sb.OpenChannel.createChannel(name, null, null, operators, null, cb));
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
  const channelLocale = process.env.NODE_ENV === "production" ? locale : defaultLanguage;
  /* Channel names follow this scheme: BitGuild-${env}-${locale}, ex: BitGuild-production-en */
  return `BitGuild-${process.env.NODE_ENV}-${channelLocale}`;
};
