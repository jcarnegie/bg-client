import SendBird from "sendbird";
import { find, propEq } from "ramda";

const APP_ID = "BB1E0777-B8CE-44DF-BA37-63EBA2E858F1";

const sbp = fn => new Promise((resolve, reject) =>
  fn((res, err) => (err) ? reject(err) : resolve(res))
);

const main = async() => {
  const sb = new SendBird({appId: APP_ID});
  const user = await sbp(cb => sb.connect("0xmememememe", cb));
  const query = sb.OpenChannel.createOpenChannelListQuery();
  console.log(query);
  const channels = await sbp(cb => query.next(cb));
  query.close();
  const channel = find(propEq("name", "BitGuild"), channels);
  // console.log(channels);
  console.log(channel);
  await sbp(cb => sb.disconnect(cb));
};

main();