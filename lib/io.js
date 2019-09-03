"use strict";

var Promise = require("bluebird");
const readdir = Promise.promisify(require("fs").readdir);

const listFiles = path => {
  return readdir(path)
}

const expand = filename => {
  const parts = filename.split('.')
  let info = {filename: filename}
  if (parts.length === 1) {
    info.extension = undefined
    info.name = parts[0]
  } else {
    info.extension = parts.pop()
    info.name = parts.join('.')
  }

  return info
}

module.exports = {listFiles, expand}