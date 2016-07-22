nock      = require "nock"
expect    = require('chai').expect
Client    = require "../../src/api/client"


describe 'client', ->
  after ->
    nock.restore()

  it 'should make a request', (done) ->
    backend = nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
                  .post('/execute/start/foo/')
                  .reply(202, {
                    status: 'OK'
                    logs: 'http://whatever'
                  })
    client = new Client()
    client.execute('foo', [], {}, '', '', (error, body) ->
      expect(error).to.be.a('null')
      expect(body).to.eql({
        'status': 'OK',
        'logs': 'http://whatever',
      })
      done()
    )

  it 'should handle 404s', (done) ->
    backend = nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
                  .post('/execute/start/foo/')
                  .reply(404)
    client = new Client()
    client.execute('foo', [], {}, '', '', (error, body) ->
      expect(error).to.equal('endpoint returned 404')
      done()
    )
