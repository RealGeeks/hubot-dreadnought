Helper = require('hubot-test-helper')
helper = new Helper('../../src/scripts/dreadnought.coffee')
co     = require('co')
expect = require('chai').expect
mockrequire = require('mock-require')
Promise = require('bluebird')



fakeClient = (error, response) ->

  class FakeClient
    execute: (task, servers, params, username, callback) ->
      callback(error, response)

  mockrequire('../../src/api/client', FakeClient)
  mockrequire.reRequire('../../src/scripts/dreadnought.coffee')

describe 'calling one of the functions', ->
  describe 'with a successful response', ->
    beforeEach ->
      fakeClient(null, {'logs': 'whatever'})
      @room = helper.createRoom()

    afterEach ->
      @room.destroy()

    context 'user calls function', ->
      beforeEach ->
        co =>
          yield @room.user.say 'alice', '@hubot remap_fields 1'
          yield new Promise.delay(1000)

      it 'should respond to success', ->
        expect(@room.messages).to.eql [
          ['alice', '@hubot remap_fields 1'],
          ['hubot', '@alice OK, I\'m running remap_fields. Logs are here: whatever'],
        ]

  describe 'with an error', ->
    beforeEach ->
      fakeClient('error', null)
      @room = helper.createRoom()

    afterEach ->
      @room.destroy()

    context 'user calls function', ->
      beforeEach ->
        co =>
          yield @room.user.say 'alice', '@hubot remap_fields 1'
          yield new Promise.delay(1000)

      it 'should respond to failures', ->
        expect(@room.messages).to.eql [
          ['alice', '@hubot remap_fields 1'],
          ['hubot', '@alice Problem running remap_fields: error'],
        ]
