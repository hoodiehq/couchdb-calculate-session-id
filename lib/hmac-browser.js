module.exports = function (key, message) {
  return new Buffer(require('crypto-lite').crypto.hmac('sha1', key, message), 'hex');
}
