// const {expect} = require('chai');
// const co = require('co');
// const Helper = require('hubot-test-helper');
// const mockrequire = require('mock-require');
// const nock = require('nock');

// const helper = new Helper('../../src/scripts/dreadnought.js');

// const testData = {
//   remap_fields: {
//     servers: [
//       {
//         finder: 'beanstalk',
//         params: {selector: 'first', environment: 'rope-prod'}
//       }
//     ],
//     params: {
//       BOARD_ID: 'int'
//     }
//   },
//   do_the_twist: {
//     servers: [
//       {
//         finder: 'beanstalk',
//         params: {selector: 'first', environment: 'rope-prod'}
//       }
//     ],
//     params: {
//       style: 'string'
//     }
//   }
// };

// const fakeClient = (error, response) => {
//   class FakeClient {
//     execute(task, servers, params, username, room, callback) {
//       callback(error, response);
//     }
//   }

//   mockrequire('../../src/api/client', FakeClient);
//   mockrequire.reRequire('../../src/scripts/dreadnought');
// };

// describe('remap', () => {
//   before(() => {
//     if (!nock.isActive()) nock.activate();

//     nock(process.env.HUBOT_DREADNOUGHT_ENDPOINT)
//       .get('/tasks/discover/')
//       .reply(200, testData);
//   });

//   after(() => nock.restore());

//   beforeEach(() => {
//     fakeClient(null, {logs: 'whatever'});
//     this.room = helper.createRoom();
//   });

//   afterEach(() => this.room.destroy());

//   context('user says `remap_fields`', () => {
//     beforeEach(() => {
//       return co(
//         function *() {
//           yield this.room.user.say(
//             'alice',
//             '@hubot run remap_fields foo --style=1 1'
//           );
//         }.bind(this)
//       );
//     });

//     it('should remap fields', () => {
//       expect(this.room.messages).to.eql([
//         ['alice', '@hubot run remap_fields foo --style=1 1'],
//         [
//           'hubot',
//           "@alice OK, I'm running remap_fields. Logs are here: whatever"
//         ]
//       ]);
//     });
//   });
// });
