Helper = require('hubot-test-helper')
helper = new Helper('../../src/scripts/dreadnought.coffee')
Config = require "../../src/api/parser"
co     = require('co')
expect = require('chai').expect
mockrequire = require('mock-require')

calls = []
postCalled = false

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

describe 'calling one of the functions', ->

  beforeEach ->
    calls = []
    postCalled = false
    @room = helper.createRoom()

  afterEach ->
    @room.destroy()

  context 'user calls function', ->
    beforeEach ->
      co =>
        yield @room.user.say 'alice', '@hubot remap_fields 1'

    it 'should respond to commands', (done) ->
      done()
      expect(@room.messages).to.eql [
        ['alice', '@hubot remap_fields 1'],
        ['hubot', '@alice OK, I\'m running remap_fields'],
      ]
