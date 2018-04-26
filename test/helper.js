global.assert = require('chai').assert;

require('chai').config.includeStack = true;

process.env.NODE_ENV = 'test';
process.env.HUBOT_DREADNOUGHT_ENDPOINT = 'http://localhost:8000';

process.env.HUBOT_DREADNOUGHT_JSON = require('path').join(
  __dirname,
  'test_dreadnought.json'
);

process.env.HUBOT_DREADNOUGHT_API_KEY = 'foofoo';
