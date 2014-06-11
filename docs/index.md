# BadgeKit API Client

A new client requires a remote endpoint, and an authorisation configuration. By default your BadgeKit API key will be `master`. The secret is set in your BadgeKit API configuration as `MASTER_SECRET`.

```js
var apiEndpoint = 'http://yourapilocation.com';
var auth = {
  key: '<api-key>',
  secret: '<api-secret>'
};
var client = new Client(apiEndpoint, auth);
```

You can then access the methods within your app via the `client` object.

All client methods, with one exception, require a [context object](#contexts), and a [callback method](#callbacks).

```js
client.<method> (<context>, <callback>);
```

The only method that does not require a context is `getSystems`:

```js
client.getSystems (<callback>);
```

_However, as this call requires master-level authentication, you probably won't be using it._

__System is the top admin level in BadgeKit. A system can contain one or more issuers, and an issuer can contain one or more programs. Badges may be associated with a system, issuer or program.__

<a name="contexts"></a>
## Contexts

At its most simple, a context object is simply a namespaced set of slugs. For example:

```js
{
  system: 'system-slug',
  issuer: 'issuer-slug',
  badge: 'badge-slug'
}
```

When submitting data, such as creating or updating an issuer, the context object expands to contain the necessary information:

```js
{
  system: 'system-slug',
  issuer: {
    name: 'Issuer Name',
    description: 'Issuer description',
    slug: 'issuer-slug'
  }
}
```

<a name="callbacks"></a>
## Callback Functions

Callback functions should accept two parameters; an error (if thrown) and any response data. For example:

```js
client.getBadges({system: 'system-slug'}, function (err, badges) {
  if (err)
    return handlerError(err);

  badges.forEach(function (badge) {
    //process this badge
    handleBadge(badge);
  });
});
```

See [methods](methods.md) for an overview of the available client methods.
