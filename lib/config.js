"use strict";
const yaml = require('js-yaml');

const load = (getConfiguration) => {
  return yaml.safeLoad(getConfiguration(), 'utf8')
}

module.exports = {load}