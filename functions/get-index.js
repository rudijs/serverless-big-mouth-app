"use strict";

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const Mustache = require("mustache");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const http = require("superagent-promise")(require("superagent"), Promise);
const restaurantsApiRoot = process.env.restaurants_api;
const aws4 = require("aws4");
const URL = require("url");

var html;

async function loadHtml() {
  if (!html) {
    html = fs.readFileAsync("static/index.html", "utf-8");
  }
  return html;
}

async function getRestaurants() {
  const url = URL.parse(restaurantsApiRoot);

  const opts = {
    host: url.hostname,
    path: url.pathname
  };

  aws4.sign(opts);

  const res = await http
    .get(restaurantsApiRoot)
    .set("Host", opts.headers["Host"])
    .set("X-Amz-Date", opts.headers["X-Amz-Date"])
    .set("Authorization", opts.headers["Authorization"])
    .set("X-Amz-Security-Token", opts.headers["X-Amz-Security-Token"]);

  const restaurants = await res.body;

  return restaurants;
}

module.exports.handler = async event => {
  const template = await loadHtml();
  const dayOfWeek = days[new Date().getDay()];
  const restaurants = await getRestaurants();
  const html = Mustache.render(template, { dayOfWeek, restaurants });

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  };
};
