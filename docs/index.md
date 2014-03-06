# BadgeKit API Client

A new client requires a remote endpoint, and an authorisation configuration.

```
var client = new Client('http://api.example.org', {
  key: '<your api key here>',
  secret: '<your api secret here>
});
```

All client methods, with one exception, require a [context object](#contexts), and a [callback method](#callbacks).

```
client.<method> (<context>, <callback>);
```

The only method that does not require a context is `getSystems`:

```
client.getSystems (<callback>);
```

However, as this call requires master-level authentication, you probably won't be using it.

<a name="contexts"></a>
## Contexts

At its most simple, a context object is simply a namespaced set of slugs. For example:

```
{
  system: 'system-slug',
  issuer: 'issuer-slug',
  badge: 'badge-slug'
}
```

When submitting data, such as creating or updating an issuer, the context object expands to contain the necessary information:

```
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

```
client.getBadges({...}, function (err, badges) {
  if (err)
    return handlerError(err);

  badges.forEach(function (badge) {
    handleBadge(badge);
  });
});
```
