module.exports = generateSessionId

var crypto = require('crypto')

function generateSessionId (options) {
  var timestamp = options.timestamp.toString(16).toUpperCase()
  var sessionData = options.username + ':' + timestamp
  var hmac = crypto.createHmac('sha1', options.salt + options.secret)
  hmac.update(sessionData)

  return Buffer.concat([
    new Buffer(sessionData + ':'),
    hmac.digest()
  ]).toString('base64').replace(/\+/g, '-')
}
