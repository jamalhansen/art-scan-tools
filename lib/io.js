"use strict";

const io = require("./io.js")


var Promise = require("bluebird");
const readdir = Promise.promisify(require("fs").readdir);
const renameSync = require('fs').renameSync;

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

const write = (filePath, contents) => {
  fs.writeFile(filePath, contents, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
}

const writeYaml = image_data => {
  image_data.forEach(image => {
      write(image.name, image.yaml)
      console.log(`Generating yaml for: "${image.name}"`)
  });
}

const rename = (source, target) => {
  renameSync(source, target)
}

module.exports = {listFiles, expand, write, writeYaml, rename}