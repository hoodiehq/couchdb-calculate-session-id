module.exports = generateSessionId

var crypto = require('crypto')

var base64url = require('base64url')
var validate = require('aproba')

function generateSessionId (username, usersalt, serversecret, timestamp) {
  validate('SSSN', arguments)

  var timestamp16 = timestamp.toString(16).toUpperCase()
  var sessionData = username + ':' + timestamp16
  var hmac = crypto.createHmac('sha1', usersalt + serversecret).update(sessionData)

  return base64url(Buffer.concat([
    new Buffer(sessionData + ':'),
    hmac.digest()
  ]))
}
