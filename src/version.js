const Path = require('path');
const pkg = require(Path.join(__dirname, '..', 'package.json'));

exports.Version = pkg.version;
