module.exports = generateSessionId

var crypto = require('crypto')

var base64url = require('base64url')

function generateSessionId (options) {
  var timestamp = options.timestamp.toString(16).toUpperCase()
  var sessionData = options.username + ':' + timestamp
  var hmac = crypto.createHmac('sha1', options.salt + options.secret).update(sessionData)

  return base64url(Buffer.concat([
    new Buffer(sessionData + ':'),
    hmac.digest()
  ]))
}
