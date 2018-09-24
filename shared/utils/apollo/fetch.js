import { merge, find, propEq } from 'ramda';
import { uri as apiUri } from './client';
import { getItem, setItem } from '@/client/utils/localStorage';
import redirect from '../redirect';

if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch'); /* eslint-disable-line no-unused-vars */
}

let refreshRequest = null;

const requestAuthorized = respData => {
  const errors = respData.errors || [];
  if (find(propEq('message', 'unauthorized'), errors)) return false;
  return true;
};

const refreshTokens = async token => {
  const mutation = `
    mutation {
      refreshToken(refreshToken: "${token}") {
        accessToken refreshToken refreshExpiresAt accessExpiresAt
      }
    }
  `;
  const resp = await fetch(apiUri(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables: null }),
  });
  return resp.json();
};

export default async(uri, options) => {
  const resp = await fetch(uri, options);
  const respData = await resp.json();
  if (!process.browser || requestAuthorized(respData)) {
    // resp.json() can only be called once since it's a streaming api,
    // so we modify it and return the json data we've already received.
    // see: https://github.com/whatwg/fetch/issues/196
    resp.json = async() => respData;
    resp.text = async() => JSON.stringify(respData);
    return resp;
  }

  if (!refreshRequest) {
    const token = getItem('refreshToken');
    refreshRequest = refreshTokens(token);
  }
  const refreshRespData = await refreshRequest;
  if (!requestAuthorized(refreshRespData)) redirect({}, '/login');
  const { data: { refreshToken: { accessToken, refreshToken } } } = refreshRespData;

  // save new/refreshed tokens to localStorage
  setItem('accessToken', accessToken);
  setItem('refreshToken', refreshToken);

  // null out the refresh request promise
  refreshRequest = null;

  // retry the original request
  return fetch(uri, options);
};
