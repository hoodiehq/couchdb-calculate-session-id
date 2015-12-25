module.exports = calculateSessionId

var base64url = require('base64url')
var createHmac = require('./hmac')
var validate = require('aproba')

function calculateSessionId (username, usersalt, serversecret, timestamp) {
  validate('SSSN', arguments)

  var timestamp16 = timestamp.toString(16).toUpperCase()
  var sessionData = username + ':' + timestamp16
  var hmac = createHmac(serversecret + usersalt, sessionData)

  return base64url(Buffer.concat([
    new Buffer(sessionData + ':'),
    hmac
  ]))
}
