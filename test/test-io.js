"use strict";

const should = require('chai').should();
const expect = require('chai').expect;
const io = require("../lib/io.js")
const path = require('path');

describe('IO', () => {
  describe('.listFiles', () => {
    it('should accept a path and return a filename', async () => {
      const singleFilePath = path.join(__dirname, "resources", "one-image")
      const files =  await io.listFiles(singleFilePath)
      files.length.should.equal(1)
      files[0].should.equal("test.png")
    });

    it('should return an empty array for an empty path', async () => {
      const singleFilePath = path.join(__dirname, "resources", "empty")
      const files =  await io.listFiles(singleFilePath)
      files.length.should.equal(0)
    });

    it('should accept a path and return multiple filenames', async () => {
      const singleFilePath = path.join(__dirname, "resources", "multiple")
      const files =  await io.listFiles(singleFilePath)
      files.length.should.equal(3)
      files.should.include("test1.png")
      files.should.include("test2.png")
      files.should.include("test3.jpg")
    });
  });

  describe('.extension', () => {
    it('should accept a filename and return the extension', () => {
      const ext = io.extension("foo.jpg")
      ext.should.equal("jpg")
    });

    it('should throw an error if filename does not have an extension', () => {
      expect(() => io.extension("extensionless")).to.throw(Error)
    });

    it('should throw an error if passed undefined', () => {
      expect(() => io.extension(undefined)).to.throw(Error)
    });
  });
});