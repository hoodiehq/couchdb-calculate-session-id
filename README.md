# couchdb-calculate-session-id

> calculates valid CouchDB session IDs using username, salt, secret & timestamp

[![Build Status](https://travis-ci.org/hoodiehq/couchdb-calculate-session-id.svg?branch=master)](https://travis-ci.org/hoodiehq/couchdb-calculate-session-id)
[![Coverage Status](https://coveralls.io/repos/hoodiehq/couchdb-calculate-session-id/badge.svg?branch=master)](https://coveralls.io/r/hoodiehq/couchdb-calculate-session-id?branch=master)
[![Dependency Status](https://david-dm.org/hoodiehq/couchdb-calculate-session-id.svg)](https://david-dm.org/hoodiehq/couchdb-calculate-session-id)
[![devDependency Status](https://david-dm.org/hoodiehq/couchdb-calculate-session-id/dev-status.svg)](https://david-dm.org/hoodiehq/couchdb-calculate-session-id#info=devDependencies)

## Example

```js
var calculateSessionId = require('couchdb-calculate-session-id')

var sessionId = calculateSessionId(
  'pat',
  '24eb90e9e1343977b8323857287ffca4',
  '78875068a1979fb910d5d8f37d316aa4',
  1449689785
)
```

## Arguments

<table>
  <thead>
    <tr>
      <th align="left">Argument</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tr>
    <th align="left"><strong>username</strong></th>
    <td>String</td>
    <td><code>name</code> property of <code>\_users</code> doc</td>
  </tr>
  <tr>
    <th align="left"><strong>usersalt</strong></th>
    <td>String</td>
    <td><code>salt</code> property of <code>\_users</code> doc</td>
  </tr>
  <tr>
    <th align="left"><strong>serversecret</strong></th>
    <td>String</td>
    <td><code>couch_httpd_auth.secret</code> of CouchDB configuration</td>
  </tr>
  <tr>
    <th align="left"><strong>timestamp</strong></th>
    <td>Number</td>
    <td>Number of seconds elapsed since 1 January 1970 00:00:00 UTC</td>
  </tr>
</table>

## How CouchDB does it using Erlang

```erlang
make_cookie_hash(UserName, Secret, TimeStamp) ->
    SessionData = UserName ++ ":" ++ erlang:integer_to_list(TimeStamp, 16),
    Hash = crypto:sha_mac(Secret, SessionData),
    couch_util:encodeBase64Url(SessionData ++ ":" ++ ?b2l(Hash)).
```

## Credits

All credits due to [@christophwitzko](https://twitter.com/christophwitzko),
[@indutny](https://twitter.com/indutny) & [@janl](https://twitter.com/janl):
https://gist.github.com/janl/4583f5eb4c0d8216cc5f

## License

[Apache-2.0](https://github.com/hoodiehq/hoodie/blob/master/LICENSE)
