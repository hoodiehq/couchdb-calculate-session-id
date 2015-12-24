module.exports = calculateSessionId

var crypto = require('crypto')

var base64url = require('base64url')
var validate = require('aproba')

function calculateSessionId (username, usersalt, serversecret, timestamp) {
  validate('SSSN', arguments)

  var timestamp16 = timestamp.toString(16).toUpperCase()
  var sessionData = username + ':' + timestamp16
  var hmac = crypto.createHmac('sha1', serversecret + usersalt).update(sessionData)

  return base64url(Buffer.concat([
    new Buffer(sessionData + ':'),
    hmac.digest()
  ]))
}
