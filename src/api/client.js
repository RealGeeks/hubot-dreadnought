const url = require('url');
const got = require('got');

const Client = class Client {
  constructor() {
    this.endpoint = process.env.HUBOT_DREADNOUGHT_ENDPOINT;
    this.api_key = process.env.HUBOT_DREADNOUGHT_API_KEY;
  }

  handleResponse(error, status, body, callback) {
    if (error) {
      callback(error);
      return;
    }

    if (status !== 202) {
      callback(`endpoint returned ${status}`);
      return;
    }

    callback(error, body);
  }

  async execute(task, servers, params, username, room, cb) {
    try {
      const response = await got.post(
        url.resolve(this.endpoint, `/execute/start/${task}/`),
        {
          json: true,
          headers: {
            Authorization: this.api_key
          },
          body: {
            servers,
            params,
            initiator: {
              type: 'hubot',
              username,
              room
            }
          }
        }
      );

      console.debug('Dreadnought response', response.body);

      this.handleResponse(null, response.statusCode, response.body, cb);
    } catch (er) {
      this.handleResponse(er, null, null, cb);
    }
  }
};

module.exports = Client;
