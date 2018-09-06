export const getConfigForGame = game => {
  let env = (process.env.DEPLOYED_ENV && process.env.DEPLOYED_ENV !== 'local') ? process.env.DEPLOYED_ENV : 'development';
  return game.config[env];
};
