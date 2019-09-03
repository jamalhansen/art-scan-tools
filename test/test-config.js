"use strict";

const should = require('chai').should();
const config = require("../lib/config.js")

describe('Config', () => {
  it('loads configuration', () => {
    const result = config.load(() => "inbox: foo/bar")
    result.inbox.should.equal("foo/bar")
  })
})