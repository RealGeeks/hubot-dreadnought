Config = require "../../src/api/parser"
expect = require('chai').expect

describe 'parsing command params', ->
  beforeEach ->
    @parser = new Config()

  it 'should parse positional arguments', ->
    expect(@parser.parseParams('do_the_twist', 'foo')).to.eql {
        "style": "foo"
    }

  it 'should parse keyword arguments', ->
    expect(@parser.parseParams('do_the_twist', '--style=foo')).to.eql {
        "style": "foo"
    }
