# Description
#   Trigger multiple GitHub deployments
#
# Commands:
#   hubot metadeploy <app-group>

Config = require "../api/parser"
Client = require "../api/client"

config = new Config()
client = new Client()

appnames = config.appNames().join("|")

COMMAND_REGEX = ///
  (#{appnames})\s+
  (.*)
  $
///i


module.exports = (robot) ->
  robot.respond COMMAND_REGEX, (msg) ->
    task = msg.match[1]
    paramString = msg.match[2]
    msg.reply "OK, I'm running #{task}"
    client.execute(
      task,
      config.servers(task),
      config.parseParams(task, paramString)
    , (error, body) -> msg.reply(body))
