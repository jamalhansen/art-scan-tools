"use strict";

const should = require('chai').should();
const expect = require('chai').expect;
const io = require("../lib/image.js")

describe('Image', () => {
  describe('.imageExtensions', () => {
    it('should be jpg and png', () => {
      io.imageExtensions.length.should.equal(2)
      io.imageExtensions.should.contain("jpg")
      io.imageExtensions.should.contain("png")
    });
  });
});