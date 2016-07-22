# Description
#   Trigger multiple GitHub deployments
#
# Commands:
#   hubot metadeploy <app-group>

Config = require "../api/parser"
Client = require "../api/client"
util   = require "util"

config = new Config()
client = new Client()

appnames = config.appNames().join("|")

COMMAND_REGEX = ///
  (#{appnames})\s+
  (.*)
  $
///i


response = (msg, task, error, body) ->
  if (error)
    msg.reply "Problem running #{task}: #{error}"
  else
    msg.reply "OK, I'm running <#{body.logs}|#{task}>"

module.exports = (robot) ->
  robot.respond COMMAND_REGEX, (msg) ->
    task = msg.match[1]
    paramString = msg.match[2]
    client.execute(
      task,
      config.servers(task),
      config.parseParams(task, paramString)
      msg.message.user.name,
      msg.envelope.room,
      (error, body) ->
        response(msg, task, error, body)
    )
