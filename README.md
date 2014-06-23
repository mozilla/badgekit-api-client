# Badgekit API Client

A Node client library for [`badgekit-api`](https://github.com/mozilla/badgekit-api).

[![Build Status](https://travis-ci.org/mozilla/badgekit-api-client.svg?branch=master)](https://travis-ci.org/mozilla/badgekit-api-client)

## Installation

```
> npm install mozilla/badgekit-api-client
```

## Usage

```js
const Client = require('badgekit-api-client');

var apiEndpoint = 'https://api.example.org';
var auth = {
  key: '<auth key>',
  secret: '<auth secret>'
};

var client = new Client(apiEndpoint, auth);
```

## Documentation

Full documentation is available in the project: [`/docs`](docs).

Most client methods accept a context object and (optionally) a callback function. The context object is expected to contain namespaced sub-objects, describing the systems, badges, etc relevant to the function call. Passing in a simple string will auto-expand. That is, `{system: 'system-slug'}` is equivalent to `{system: {slug: 'system-slug'}}`.

Callback functions should accept two arguments: an error (where thrown) and any response data.

```js
client.getBadges({system: 'system-slug'}, function (err, badges) {
  if (err) return handleError(err);

  badges.forEach(function (badge) {
    // handle badge
  });
});
```

[Method calls](docs/methods.md) provide management for badges, assessment, issuing and system/ issuer/ program admin.

[Response data items](docs/models.md) all have basic functionality to allow for manipulation without having to maintain the context. For example:

```js
client.getBadge({system: 'system-slug', badge: 'badge-slug'}, function (err, badge) {
  if (err) return handleError(err);

  badge.strapline = 'A new badge strapline';
  client.updateBadge({system: 'system-slug', badge: badge});

  //...
});
```

...is equivalent to:

```js
client.getBadge({system: 'system-slug', badge: 'badge-slug'}, function (err, badge) {
  if (err) return handleError(err);

  badge.strapline = 'A new badge strapline';
  badge.save();

  //...
});
```
