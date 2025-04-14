const CLIENT_URL = "http://localhost:3000";
const ROOT_URL = "http://localhost:9000";

// const CLIENT_URL = "https://platle.com";
// const ROOT_URL = "https://api.platle.com";

const BASE_URL = `${ROOT_URL}/v1/`;
const API_ENDPOINTS = {
  // auth
  GOOGLE: "auth/google",

  // user
  ONBOARDING: "user/onboarding",
  GET_USER: "user",

  // discover
  GET_CONTENT: "discover/content",
  GET_CACHE: "discover/cache",
  LIKE: "discover/like",
  PASS: "discover/pass",
  GET_YOUTUBE_URL: "discover/youtube",

  // content
  GET_CONTENT_DETAILS: "content",
  GET_STREAMING_AVAILABILITY: "content/streaming",

  // watchlist
  GET_WATCHLIST: "watchlist",
  DELETE_WATCHLIST: "watchlist",
};

// const FILES_URL2 = `https://fanbear-app.s3.amazonaws.com/`;
const FILES_URL2 = `https://fanbear-app.s3-accelerate.amazonaws.com/`;
const FILES_URL = `https://d1764yv42zim9l.cloudfront.net/`;

// const ASSETS_URL = `https://fanbear-assets.s3-accelerate.amazonaws.com/`;
const ASSETS_URL = `https://dzjkc846jk9vh.cloudfront.net/`;

export {
  CLIENT_URL,
  ROOT_URL,
  BASE_URL,
  API_ENDPOINTS,
  FILES_URL,
  FILES_URL2,
  ASSETS_URL,
};
