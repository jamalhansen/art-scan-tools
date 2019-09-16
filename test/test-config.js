"use strict";

const should = require('chai').should()
const path = require('path')
const config = require("../lib/config.js")

describe('Config', () => {
  it('loads configuration', () => {
    const result = config.load(() => "inbox: foo/bar")
    result.inbox.should.equal("foo/bar")
  })

  it('adds home directory paths', () => {
    const result = config.add_home("foo/bar")
    result.should.contain("foo/bar")
  })
})