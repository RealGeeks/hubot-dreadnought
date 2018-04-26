const Path = require('path');

module.exports = robot =>
  robot.loadFile(Path.resolve(__dirname, 'src', 'scripts'), 'dreadnought.js');
