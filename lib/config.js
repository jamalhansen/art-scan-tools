"use strict";
const yaml = require('js-yaml')
const path = require('path')

const load = (getConfiguration) => {
  return yaml.safeLoad(getConfiguration(), 'utf8')
}

const home = () => {
  return require('os').homedir();
}

const add_home = (partial_path) => {
  return path.join(home(), partial_path)
}

module.exports = {load, add_home, home}