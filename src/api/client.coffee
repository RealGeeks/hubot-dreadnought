url                = require "url"
request            = require "request"

module.exports = class Client

  constructor: () ->
    @endpoint = process.env['HUBOT_DREADNOUGHT_ENDPOINT']
    @api_key = process.env['HUBOT_DREADNOUGHT_API_KEY']

  handle_response: (error, response, body, callback) ->
    if error
      callback(error)
      return
    if response.statusCode != 202
      callback("endpoint returned #{response.statusCode}")
      return
    return callback(error, body)

  execute: (task, servers, params, username, room, callback) ->
    uri = url.resolve(@endpoint, "/execute/start/#{task}/")
    request({
      uri: uri,
      method: "POST",
      headers: {
        'Authorization': @api_key
      },
      json: {
        servers: servers,
        params: params,
        initiator: {
          type: 'hubot',
          username: username
          room: room
        }
      }
    }, (error, response, body) =>
      this.handle_response(error, response, body, callback))
