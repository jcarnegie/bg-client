import fetch from "isomorphic-fetch";
import {uri} from "./apollo";

export default function callAPI(url, options = {}) {
  return fetch(uri + url, options)
    .then(response =>
      response.json().then(json => ({json, response}))
    )
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json.errors);
      }
      return json;
    });
}
