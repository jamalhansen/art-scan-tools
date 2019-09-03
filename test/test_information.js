"use strict";

const should = require('chai').should();
const information = require("../lib/information.js")

describe('Information', () => {
  describe('.getTemplate', () => {
    it('contains the basic data element for the file', () => {
      const result = information.getTemplate()
      result.name.should.equal("")
      result.date.should.equal("")
      result.title.should.equal("")
      result.scanned.should.equal("")
      result.category.should.equal("")
      result.tags.length.should.equal(0)
      result.media.length.should.equal(0)
      result.orientation.should.equal("landscape")
      result.description.should.equal("")
      result.references.length.should.equal(1)
      result.references[0].name.should.equal("")
      result.references[0].url.should.equal("")
      result.references[0].description.should.equal("")
    })
  })

  describe('.getInfo', () => {
    it('gets template filled with basic info for the file', () => {
      const result = information.getInfo("20191225-christmas-time")
      result.name.should.equal("christmas-time")
      result.date.should.eql(new Date(2019, 11, 25))
      result.title.should.equal("Christmas Time")
      result.scanned.should.eql(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()))
      result.category.should.equal("")
      result.tags.length.should.equal(2)
      result.tags.should.contain("christmas")
      result.tags.should.contain("time")
      result.media.length.should.equal(0)
      result.orientation.should.equal("landscape")
      result.description.should.equal("")
      result.references.length.should.equal(1)
      result.references[0].name.should.equal("")
      result.references[0].url.should.equal("")
      result.references[0].description.should.equal("")
    })
  })


  describe('.infer', () => {
    it('will determine basic information from the filename', () => {
      const result = information.infer("20190203-coding-truck")
      result.name.should.equal("coding-truck")
      result.date.should.eql(new Date(2019, 1, 3))
      result.title.should.equal("Coding Truck")
      result.scanned.should.eql(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()))
      result.tags.should.contain("coding")
      result.tags.should.contain("truck")
    })
  })

  describe('.splitFileName', () => {
    it('split the filename', () => {
      const result = information.splitFileName("20190506-foo")
      result.date.should.equal("20190506")
      result.name.length.should.equal(1)
      result.name[0].should.equal("foo")
    })
  })

  describe('.parseDate', () => {
    it('converts date string to date', () => {
      const result = information.parseDate("20190621")
      result.should.eql(new Date(2019, 5, 21))
    })
  })

  describe('.merge', () => {
    it('merges values with defaults', () => {
      const values = () => {return {name: "foo"}}
      const defaults = () =>  {return {name: "", thing: "what"}}
      const result = information.merge(values, defaults)
      result.name.should.equal("foo")
      result.thing.should.equal("what")
    })
  })
})