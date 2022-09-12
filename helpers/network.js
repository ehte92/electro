import CookieManager from "@react-native-cookies/cookies";
import axios from "axios";
import { entries } from "lodash";

const $fetcher = axios.create({
  baseURL: "https://www.dev.wp.uruvak.com/",
  responseType: "json",
});

const logger = [];

if (__DEV__) {
  globalThis.logger = logger;
}

let headers = {};
let cookies = {};

export function configure($headers) {
  // Update header for next calls
  headers = $headers;

  // Destruct the cookies string to an object { key: value }
  cookies = $headers.cookie.split(";").reduce((acc, cur) => {
    const [key, value] = cur.split("=");

    if (key.length > 0) {
      acc[key] = value;
    }

    return acc;
  }, {});
}
const _get = $fetcher.get;
const _post = $fetcher.post;

$fetcher.get = function get(url, config) {
  return new Promise((resolve) => {
    // Clear all cookies
    CookieManager.clearAll().then(() => {
      // reconstruct each cookie with the native value provided
      const promises = entries(cookies).map(([name, value]) =>
        CookieManager.set($baseUrl, {
          name,
          value,
        })
      );

      // After all cookies were resolved, continue with the fetch
      Promise.all(promises).then(() => {
        resolve(
          _get(
            url,
            config
              ? {
                  ...config,
                  headers,
                }
              : {
                  headers,
                }
          )
        );
      });
    });
  });
};

$fetcher.post = function post(url, data, config) {
  return new Promise((resolve) => {
    CookieManager.clearAll().then(() => {
      resolve(
        _post(
          url,
          data,
          config
            ? {
                ...config,
                headers,
              }
            : {
                headers,
              }
        )
      );
    });
  });
};

export default function fetcher() {
  return $fetcher;
}
