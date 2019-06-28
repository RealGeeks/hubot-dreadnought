// Description:
//   Runs Dreadnaught tasks in Elastic Beanstalk environments. Manage tasks
//   directly in Dreadnaught.
//
// Commands:
//   geekbot dread|run <task-slug> - Runs the <task> with Dreadnought.

const Client = require('../api/client');
const client = new Client();
const getParser = require('../api/parser');

const response = function (msg, task, error, body) {
  if (error) {
    msg.reply(`Problem running ${task}: ${error}`);
  } else {
    msg.reply(`OK, I'm running ${task}. Logs are here: ${body.logs}`);
  }
};

module.exports = robot => {
  robot.respond(/(run|dread)\s(\w+)\s*(.*)$/i, function (msg) {
    const task = msg.match[2];
    const paramString = msg.match[3];

    getParser()
      .then(parser => {
        const tasks = parser.appNames();

        if (!tasks[task]) {
          response(msg, task, 'no such task');
          return;
        }

        client.execute(
          task,
          parser.servers(task),
          parser.parseParams(task, paramString),
          msg.message.user.name,
          msg.envelope.room,
          (error, body) => response(msg, task, error, body)
        );
      })
      .catch(er => response(msg, task, er, null));
  });
};
