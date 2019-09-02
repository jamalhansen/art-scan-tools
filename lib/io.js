"use strict";

var Promise = require("bluebird");
const readdir = Promise.promisify(require("fs").readdir);

const listFiles = path => {
    return readdir(path)
}

module.exports = {listFiles}