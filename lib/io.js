"use strict";

var Promise = require("bluebird");
const readdir = Promise.promisify(require("fs").readdir);

const listFiles = path => {
  return readdir(path)
}

const extension = filename => {
  if (filename == undefined) throw new Error("Filename is undefined")
  const parts = filename.split('.')

  if (parts.length > 1) {
    return parts.pop()
  } else {
    throw new Error("Filename '#{filename}' does not have an extension")
  }
}

module.exports = {listFiles, extension}