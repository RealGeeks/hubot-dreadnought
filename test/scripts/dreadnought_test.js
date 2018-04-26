const Helper = require('hubot-test-helper');
const co = require('co');
const helper = new Helper('../../src/scripts/dreadnought.js');
const nock = require('nock');
const {expect} = require('chai');

const testData = {
  remap_fields: {
    servers: [
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ],
    params: {
      BOARD_ID: 'int'
    }
  },
  do_the_twist: {
    servers: [
      {
        finder: 'beanstalk',
        params: {selector: 'first', environment: 'rope-prod'}
      }
    ],
    params: {
      style: 'string'
    }
  }
};

describe('remap', () => {
  beforeEach(() => {
    this.room = helper.createRoom();

    nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
      .get('/tasks/discover/')
      .reply(200, testData);
  });

  afterEach(() => this.room.destroy());
  after(() => nock.restore());

  context('user says `remap_fields`', () => {
    beforeEach(() => {
      co(
        function *() {
          yield this.room.user.say(
            'alice',
            '@hubot run remap_fields foo --style=1 1'
          );
        }.bind(this)
      );
    });

    it('should remap fields', () => {
      expect(this.room.messages).to.eql([
        ['alice', '@hubot run remap_fields foo --style=1 1'],
        [
          'hubot',
          "@alice OK, I'm running remap_fields. Logs are here: whatever"
        ]
      ]);
    });
  });
});
