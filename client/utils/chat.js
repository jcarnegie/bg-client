import Promise from "bluebird";
import SendBird from "sendbird";
import {find, propEq, reverse} from "ramda";

export let _sb = null;
export let _user = null;

/**
 * Simple utility function to promisify SendBird calls
 * @param {*} fn 
 */
export const sbp = fn => new Promise((resolve, reject) =>
  fn((res, err) => (err) ? reject(err) : resolve(res))
);

export const init = async(wallet, nickname) => {
  _sb = new SendBird({appId: "BB1E0777-B8CE-44DF-BA37-63EBA2E858F1"});
  _user = await sbp(cb => _sb.connect(wallet, cb));
  _user = await sbp(cb => _sb.updateCurrentUserInfo(nickname, null, cb));
  return [_sb, _user];
};

export const channels = async(sb = _sb) => {
  const query = sb.OpenChannel.createOpenChannelListQuery();
  return sbp(cb => query.next(cb));
};

export const channelByName = async(name, channels, sb = _sb) => {
  // Todo: fix
  const channel = find(propEq("name", name), channels);
  return sbp(cb => sb.OpenChannel.getChannel(channel.url, cb));
};

export const setChannelByName = async(name, channels) => {
  const channel = await channelByName(name, channels);
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
