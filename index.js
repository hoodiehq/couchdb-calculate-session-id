module.exports = generateSessionId

var crypto = require('crypto')

function generateSessionId (options) {
  var timestamp = options.timestamp.toString(16).toUpperCase()
  var sessionData = options.username + ':' + timestamp
  var hmac = crypto.createHmac('sha1', options.salt + options.secret)
  hmac.update(sessionData)
  var hash = hmac.digest()

  return Buffer.concat([
    new Buffer(sessionData),
    new Buffer(':'),
    new Buffer(hash)
  ]).toString('base64').replace(/\+/g, '-')
}
