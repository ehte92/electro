import axios from "axios";

const $fetcher = axios.create({
  baseURL: "https://www.dev.wp.uruvak.com/",
  responseType: "json",
});

const logger = [];

if (__DEV__) {
  globalThis.logger = logger;
}

export default function fetcher() {
  return $fetcher;
}
