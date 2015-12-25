module.exports = function (key, message) {
  return require('crypto').createHmac('sha1', key).update(message).digest()
}
