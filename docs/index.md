# BadgeKit API Client

A new client requires a remote endpoint (for your BadgeKit API instance) and an authorisation configuration. By default your BadgeKit API key will be `master`. The secret is set in your BadgeKit API configuration as `MASTER_SECRET`.

```js
var apiEndpoint = 'http://yourapilocation.com';
var auth = {
  key: '<api-key>',
  secret: '<api-secret>'
};
var client = new Client(apiEndpoint, auth);
```

You can then access the methods within your app via the `client` object.

Most client methods require a [context object](#contexts), and a [callback method](#callbacks).

```js
client.<method> (<context>, <callback>);
```

__Note on context: System is the top admin level in BadgeKit. A system can contain one or more issuers, and an issuer can contain one or more programs. Badges may be associated with a [`System`](systems.md), [`Issuer`](issuers.md) or [`Program`](programs.md). You will therefore typically represent the admin context for the client as: a System; System plus Issuer; System plus Issuer plus Program. Other contexts include [`Badge`](badges.md), [`Application`](assessment.md), [`Review`](assessment.md#addreview-review), [`ClaimCode`](claim-codes.md) and [`Instance`](issuing.md).__

_See [models](models.md) for more on how the client handles BadgeKit objects._

<a name="contexts"></a>
## Contexts

The client uses the context to determine which BadgeKit objects your method calls relate to. Your client calls should define context in JSON format. Each context object can contain multiple fields, however in cases where an object simply needs identified, only the `slug` needs to be provided (with the exception of claim codes, which are identified by `code`).

At its most simple, a context object is a namespaced set of slugs. For example:

```js
{
  system: 'system-slug',
  issuer: 'issuer-slug',
  badge: 'badge-slug'
}
```

This indicates a badge context, within a system and issuer. This would be typical of a client method call in which you were retrieving data.

When submitting data, such as creating or updating an item (`issuer` in the following example), the context objects can expand to contain the additional information:

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

While the previous shorthand version only indicates the issuer `slug` (which is enough for the client to identify a system, issuer, program, badge, application, review or instance - claim codes require `code` instead), this version includes the data you are submitting to the client, for example to update or create the issuer. These two alternatives therefore represent the same `system`:

```js
{
  system: 'system-slug'
}
```

```js
{
  system: {
    slug: 'system-slug'
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

Data returned from the client is JSON formatted. For example:

```json
[
    {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        ...
    },
    ...
]
```

See [methods](methods.md) for links to detailed examples of client method calls and responses.
