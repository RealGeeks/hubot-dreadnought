const nock = require('nock');
const Parser = require('../../src/api/parser');
const {expect} = require('chai');

const testData = {
  remap_fields: {
    servers: [
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ],
    params: [['BOARD_ID', 'int']]
  },
  do_the_twist: {
    servers: [
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ],
    params: [['style', 'string']]
  },
  foobar: {
    servers: [
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ],
    params: []
  }
};

describe('parsing command params', function () {
  beforeEach(async () => {
    nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
      .get('/tasks/discover/')
      .reply(200, testData);

    this.config = await Parser();
  });

  after(() => nock.restore());

  it('should return available app names', () =>
    expect(this.config.servers('do_the_twist')).to.eql([
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ]));

  it('should return server config', () =>
    expect(this.config.appNames()).to.eql(Object.keys(testData)));

  it('should parse positional arguments', () =>
    expect(this.config.parseParams('do_the_twist', 'foo')).to.eql({
      style: 'foo'
    }));

  it('should parse keyword arguments', () =>
    expect(this.config.parseParams('do_the_twist', '--style=foo')).to.eql({
      style: 'foo'
    }));

  it('handles empty params', () =>
    expect(this.config.parseParams('foobar', '--style=foo')).to.eql({}));
});
