request            = require "request"
url                = require "url"

module.exports = class Client

  constructor: () ->
    @endpoint = process.env['HUBOT_DREADNOUGHT_ENDPOINT']

  execute: (task, servers, params, callback) ->
    request({
      uri: url.resolve(@endpoint, "/execute/start/#{task}/")
      method: "POST",
      json: {
        servers: servers,
        params: params
      }
    }, (error, response, body) ->
      if error or response.statusCode != 200
        callback(error)
        return
      callback(error, body)
    )
