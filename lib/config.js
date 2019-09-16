"use strict";
const yaml = require('js-yaml')
const path = require('path')

const load = (getConfiguration) => {
  return yaml.safeLoad(getConfiguration(), 'utf8')
}

const home = () => {
  return require('os').homedir();
}

const addHome = (partial_path) => {
  return path.join(home(), partial_path)
}

const getConfiguration = () => {
  return fs.readFileSync("./config.yml", 'utf8');
}

module.exports = {load, addHome, home, getConfiguration}