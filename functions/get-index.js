"use strict";

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const Mustache = require("mustache");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const http = require("superagent-promise")(require("superagent"), Promise);
const restaurantsApiRoot = process.env.restaurants_api;

var html;

async function loadHtml() {
  if (!html) {
    html = fs.readFileAsync("static/index.html", "utf-8");
  }
  return html;
}

module.exports.handler = async event => {
  const template = await loadHtml();
  const res = await http.get(restaurantsApiRoot);
  const restaurants = await res.body;
  const dayOfWeek = days[new Date().getDay()];
  const html = Mustache.render(template, { dayOfWeek, restaurants });

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  };
};
