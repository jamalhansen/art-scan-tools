"use strict";

var Promise = require("bluebird");
const readdir = Promise.promisify(require("fs").readdir);

const listFiles = path => {
  return readdir(path)
}

const expand = filename => {
  const parts = filename.split('.')
  if (parts.length === 1) {
    return {
      extension: undefined
      ,name: parts[0]
    }
  } 
  
  return {
    extension: parts.pop()
    ,name: parts.join('.')
  }
}

module.exports = {listFiles, expand}