const nock = require('nock');
const {expect} = require('chai');
const Client = require('../../src/api/client');

describe('client', function () {
  after(() => nock.restore());

  it('should make a request', function (done) {
    const client = new Client();

    nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
      .post('/execute/start/foo/')
      .reply(202, {
        status: 'OK',
        logs: 'http://whatever'
      });

    client.execute('foo', [], {}, '', '', function (error, body) {
      expect(error).to.be.a('null');
      expect(body).to.eql({
        status: 'OK',
        logs: 'http://whatever'
      });
      done();
    });
  });

  it('should handle 404s', function (done) {
    const client = new Client();

    nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
      .post('/execute/start/foo/')
      .reply(404);

    client.execute('foo', [], {}, '', '', function (error, body) {
      expect(error.statusCode).to.equal(404);
      done();
    });
  });
});
