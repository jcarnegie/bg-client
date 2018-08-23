import * as log from 'loglevel';

export const DISCORD_CHANNEL_DEFAULT = '448243019951374337';

export const createCrate = (crate = null) => {
  if (typeof window.Crate !== 'undefined') {
    log.info('Creating crate widget for discord server, shard: ', process.env.DISCORD_SERVER, process.env.DISCORD_SHARD);
    return new window.Crate({
      server: process.env.DISCORD_SERVER,
      channel: DISCORD_CHANNEL_DEFAULT,
      shard: process.env.DISCORD_SHARD,
      defer: true,
    });
  } else {
    setTimeout(createCrate, 100);
    return null;
  }
};
