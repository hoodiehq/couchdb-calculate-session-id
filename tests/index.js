var test = require('tape')

var calculateSessionId = require('../')

test('valid arguments CouchDB 1.5', function (t) {
  var expectedSessionId = 'amFuOjU2Njg4MkI5OkEK3-1SRseo6yNRHfk-mmk6zOxm'
  var username = 'jan'
  var usersalt = 'd5513283df4f649c72757a91aa30bdde'
  var serversecret = '4ed13457964f05535fbb54c0e9f77a83'
  var timestamp = 1449689785
  var result = calculateSessionId(
    username,
    usersalt,
    serversecret,
    timestamp
  )

  t.is(result, expectedSessionId, 'returns expected session ID')

  t.end()
})

test('valid arguments CouchDB 1.6.1', function (t) {
  var expectedSessionId = 'dGVzdDQ3OWQ2MDI6NTY3QzE3NzE6BT0lIdzzNDAEqerXpzxOw1AZvsQ'
  var username = 'test479d602'
  var usersalt = '1ac16e1dd1e01201ec16d1941b119e1991e91d018a1af19b'
  var serversecret = '78875068a1979fb910d5d8f37d316aa4'
  var timestamp = 1450973041

  var result = calculateSessionId(
    username,
    usersalt,
    serversecret,
    timestamp
  )

  t.is(result, expectedSessionId, 'returns expected result')

  t.end()
})

test('invalid arguments', function (t) {
  t.throws(calculateSessionId, {code: 'EMISSINGARG'}, 'missing arguments')
  t.throws(calculateSessionId.bind(null, '1', '2', '3', 4, 5), {code: 'ETOOMANYARGS'}, 'too many arguments')

  t.test('types', function (tt) {
    tt.throws(calculateSessionId.bind(null, 1, '2', '3', 4), {code: 'EINVALIDTYPE'})
    tt.throws(calculateSessionId.bind(null, '1', 2, '3', 4), {code: 'EINVALIDTYPE'})
    tt.throws(calculateSessionId.bind(null, '1', '2', 3, 4), {code: 'EINVALIDTYPE'})
    tt.throws(calculateSessionId.bind(null, '1', '2', '3', '4'), {code: 'EINVALIDTYPE'})

    tt.end()
  })

  t.end()
})
