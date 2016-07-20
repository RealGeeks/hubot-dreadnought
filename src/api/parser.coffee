Fs                 = require "fs"
Path               = require "path"
parser             = require "minimist"

CONFIG_FILE = process.env.HUBOT_DREADNOUGHT_JSON or 'dreadnought.json'

module.exports = class Config

  constructor: () ->
    try
      @commands = JSON.parse(Fs.readFileSync(CONFIG_FILE).toString())
    catch
      throw new Error("Unable to parse your dreadnought.json file in hubot-dreadnought")

  appNames: ->
    return Object.keys(@commands)

  servers: (appName) ->
    return @commands[appName].servers

  parseParams: (appName, paramString) ->
    args = parser(paramString.split(' '))
    i = 0
    for arg of args._
      key = Object.keys(@commands[appName].params)[i]
      args[key] = args._[arg]
      i++
    delete args._
    return args
