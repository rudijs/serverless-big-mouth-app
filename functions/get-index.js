"use strict";

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

var html;

async function loadHtml() {
  if (!html) {
    html = fs.readFileAsync("static/index.html", "utf-8");
  }
  return html;
}

module.exports.handler = async event => {
  const html = await loadHtml();

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  };
};
