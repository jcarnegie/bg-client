import * as log from 'loglevel';

export const DISCORD_CHANNEL_DEFAULT = '448243019951374337';

const CRATE_SERVERS = [
  'https://cl1.widgetbot.io',
  'https://cl2.widgetbot.io',
  'https://cl3.widgetbot.io',
  'https://cl4.widgetbot.io',
  'https://cl5.widgetbot.io',
];

export const createCrate = async(crate = null, attempt = 0) => {
  if (typeof window.Crate !== 'undefined') {
    log.info('Creating crate widget for discord server, shard: ', process.env.DISCORD_SERVER, process.env.DISCORD_SHARD);
    return new window.Crate({
      server: process.env.DISCORD_SERVER || CRATE_SERVERS[1],
      channel: DISCORD_CHANNEL_DEFAULT,
      shard: process.env.DISCORD_SHARD,
      defer: true,
    });
  } else {
    setTimeout(() => createCrate(null, attempt++), 100);
    return null;
  }
};
