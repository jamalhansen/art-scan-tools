"use strict";

const imageExtensions = ["jpg", "png"]
const io = require("./io.js")

const inbox = files => {
  return files.map(io.expand).filter(x => imageExtensions.includes(x.extension))
}

module.exports = {imageExtensions, inbox}