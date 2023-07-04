const fs = require("fs");
const oauth = require("oauth");

const PUBLISHER_JSON_PATH = process.argv[2];
const PUBLISHER_JSON_DATA = require(PUBLISHER_JSON_PATH);

// const {
//   TWITTER_API_KEY,
//   TWITTER_API_SECRET,
//   TWITTER_ACCESS_TOKEN,
//   TWITTER_ACCESS_TOKEN_SECRET,
// } = process.env;

const TWITTER_ACCESS_TOKEN_SECRET =
  "F6ehCSfq6aZNVTumkX2OQtn5AFCVxCTtRGXScBASwNhqz";
const TWITTER_ACCESS_TOKEN =
  "4870540745-oHmHARd9A2EwMC6I45R3sdDDxVqszmqaLTq6hjN";
const TWITTER_API_KEY = "ycBwM7K4v7ZwIkXGvvgMd4oYG";
const TWITTER_API_SECRET = "gkQx7Rfz3Q279TTnLNnmdNiupvbph3gMnakocdyHEwOxVeqyF9";

const tweet = async (/** @type {string} */ text) => {
  const client = new oauth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  client.post(
    "https://api.twitter.com/2/tweets",
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET,
    JSON.stringify({ text }),
    "application/json",
    (err, data) => {
      if (err) {
        console.error("[ERROR][Tweet]", err);
      } else {
        console.log("Tweet:", data);
      }
    }
  );
};

const run = () => {
  const post = PUBLISHER_JSON_DATA.shift();
  PUBLISHER_JSON_DATA.push(post);
  fs.writeFileSync(
    PUBLISHER_JSON_PATH,
    JSON.stringify(PUBLISHER_JSON_DATA, null, 2),
    "utf8"
  );

  const [message, hashtags, url] = post;
  const text = message + (hashtags ? "\n" + hashtags : "") + " " + url;
  tweet(text);
};

run();
