import * as log from 'loglevel';
import { path, pathOr } from 'ramda';

const CRATE_SERVERS = [
  'https://cl1.widgetbot.io',
  'https://cl2.widgetbot.io',
  'https://cl3.widgetbot.io',
  'https://cl4.widgetbot.io',
  'https://cl5.widgetbot.io',
];

const DISCORD_CHANNELS_BY_PATHNAME = {
  '/game/bitizens': '448243019951374337',
  '/game/mythereum': '448243644630040587',
  '/game/blockchain.cuties': '474125182353670144',
  '/game/magicacademy': '447452186839089152',
  '/game/ether.online': '447452231797571594',
};

const discordChannelForCurrentPathname = () => {
  const pathname = path(['location', 'pathname'], window);
  return pathOr(process.env.DISCORD_CHANNEL_DEFAULT, [pathname], DISCORD_CHANNELS_BY_PATHNAME)
};

export const createCrate = async(crate = null, attempt = 0) => {
  if (typeof window.Crate !== 'undefined') {
    const channel = discordChannelForCurrentPathname();
    log.info(`Creating Crate widget for Discord server ${process.env.DISCORD_SERVER}, shard ${process.env.DISCORD_SHARD}, channel: ${channel}`);
    return new window.Crate({
      server: process.env.DISCORD_SERVER || CRATE_SERVERS[1],
      channel,
      shard: process.env.DISCORD_SHARD,
      defer: true,
    });
  } else {
    setTimeout(() => createCrate(null, attempt++), 100);
    return null;
  }
};
