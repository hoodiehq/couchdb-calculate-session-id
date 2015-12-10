var test = require('tap').test

var generateSessionId = require('../index')

test('valid arguments', function (t) {
  var expected = 'amFuOjU2Njg4MkI5OkEK3-1SRseo6yNRHfk-mmk6zOxm'
  var result = generateSessionId(
    'jan',
    '4ed13457964f05535fbb54c0e9f77a83',
    'd5513283df4f649c72757a91aa30bdde',
    1449689785
  )

  t.is(result, expected, 'returns expected result')

  t.end()
})

test('invalid arguments', function (t) {
  t.throws(generateSessionId, {code: 'EMISSINGARG'}, 'missing arguments')
  t.throws(generateSessionId.bind(null, '1', '2', '3', 4, 5), {code: 'ETOOMANYARGS'}, 'too many arguments')

  t.test('types', function (tt) {
    tt.throws(generateSessionId.bind(null, 1, '2', '3', 4), {code: 'EINVALIDTYPE'})
    tt.throws(generateSessionId.bind(null, '1', 2, '3', 4), {code: 'EINVALIDTYPE'})
    tt.throws(generateSessionId.bind(null, '1', '2', 3, 4), {code: 'EINVALIDTYPE'})
    tt.throws(generateSessionId.bind(null, '1', '2', '3', '4'), {code: 'EINVALIDTYPE'})

    tt.end()
  })

  t.end()
})
