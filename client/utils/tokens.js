import * as bgLocalStorage from '@/client/utils/localStorage';

export const storeTokenData = tokenData => {
  bgLocalStorage.setItem('accessToken', tokenData.accessToken);
  bgLocalStorage.setItem('refreshToken', tokenData.refreshToken);
  bgLocalStorage.setItem('refreshExpiresAt', tokenData.refreshExpiresAt);
  bgLocalStorage.setItem('accessExpiresAt', tokenData.accessExpiresAt);
};

export const accessTokenExpired = () => {
  const expAtValue = bgLocalStorage.getItem('accessExpiresAt');
  if (expAtValue === null) return true;
  const accessExpiresAt = new Date(expAtValue);
  const now = new Date();
  return accessExpiresAt < now;
};

export const refreshTokenExpired = () => {
  const expAtValue = bgLocalStorage.getItem('refreshExpiresAt');
  if (expAtValue === null) return true;
  const refreshExpiresAt = new Date(expAtValue);
  const now = new Date();
  return refreshExpiresAt < now;
};