const got = require('got');
const minimist = require('minimist');

const fetchConfig = async () => {
  try {
    const response = await got.get(
      `${process.env.HUBOT_DREADNOUGHT_ENDPOINT}/tasks/discover/`,
      {
        headers: {
          Authorization: process.env.HUBOT_DREADNOUGHT_API_KEY
        },
        json: true
      }
    );

    return response.body;
  } catch (er) {
    return {};
  }
};

module.exports = () => {
  const Parser = fetchConfig()
    .then(config => {
      const appNames = () => Object.keys(config);

      const servers = appName => config[appName].servers;

      const parseParams = (appName, paramString) => {
        if (!config[appName].params || config[appName].params.length === 0) {
          return {};
        }

        const args = minimist(paramString.split(' '));
        let i = 0;

        for (let arg in args._) {
          const key = config[appName].params[i] && config[appName].params[i][0];
          if (!key) continue;
          args[key] = args._[arg];
          i++;
        }

        delete args._;

        return args;
      };

      return {
        appNames,
        parseParams,
        servers
      };
    })
    .catch(er => {
      console.error(
        'Something went wrong discovering dreadnought actions.',
        er
      );
    });

  return Parser;
};
