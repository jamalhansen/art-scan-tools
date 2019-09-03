"use strict";

const imageExtensions = ["jpg", "png"]
const io = require("./io.js")

const inbox = getFiles => {
  return getFiles().map(io.expand).filter(x => imageExtensions.includes(x.extension))
}

module.exports = {imageExtensions, inbox}