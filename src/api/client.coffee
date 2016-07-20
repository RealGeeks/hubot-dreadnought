url                = require "url"
request            = require "request"

module.exports = class Client

  constructor: () ->
    @endpoint = process.env['HUBOT_DREADNOUGHT_ENDPOINT']

  handle_response: (error, response, body, callback) ->
    if error
      callback(error)
      return
    if response.statusCode != 202
      callback("endpoint returned #{response.statusCode}")
      return
    return callback(error, body)

  execute: (task, servers, params, callback) ->
    uri = url.resolve(@endpoint, "/execute/start/#{task}/")
    request({
      uri: uri,
      method: "POST",
      json: {
        servers: servers,
        params: params
      }
    }, (error, response, body) =>
      this.handle_response(error, response, body, callback))
