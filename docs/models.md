# Models

You should not have to create model instances in order to use the client, however the following overview explains how the client models BadgeKit objects.

Models are created either from a simple identifier, or a full object describing the model instance. Model instances also require a parent, which will vary depending on the context. `Badges` require a `System`, `Issuer` or `Program`, for example, while `Applications` require a `Badge`, and `Reviews` require an `Application`.

As with client method calls, defining model objects involves JSON, which can be abbreviated:

```js
var item = new Model('item-slug', <parent>);
```

...is equivalent to:

```js
var item = new Model({
  slug: 'item-slug'
}, <parent>);
```

...alternatively, with a full context:

```js
var item = new Model({
  slug: 'item-slug',
  name: 'Item Name',
  description: 'Item Description',
  image: '/path/to/local/image.png'
}, <parent>);
```

## Common methods

* **`create`** - saves new model instance.

```js
item.create(function (err, item) {
  ...
});
```

* **`load`** - loads model instance data.

```js
item.load(function (err, item) {
  ...
});
```

* **`save`** - saves updated model instance.

```js
item.save(function (err, item) {
  ...
});
```

* **`delete`** - deletes model instance.

```js
item.delete(function (err, item) {
  ...
});
```

Additionally, `Systems`, `Issuers` and `Programs` all have the following shared methods:

* **getBadges** - loads all associated badges.

```js
item.getBadges(function (err, badges) {
  ...
});
```

* **getBadge** - loads an associated badge.

```js
item.getBadge(badge, function (err, badge) {
  ...
});
```

* **addBadge** - adds a badge to this instance.

```js
item.addBadge(badge, function (err, badge) {
  ...
});
```

Along with `Badges`, `Systems`/`Issuers`/`Programs` also have these methods:

* **getApplications** - gets all associated badge applications.

```js
item.getApplications(function (err, applications) {
  ...
});
```

* **getClaimCodes** - gets all associated claim codes.

```js
item.getClaimCodes(function (err, claimCodes) {
  ...
});
```

## Badge

```js
var badge = new Badge(<data>, System|Issuer|Program);
```

* **`addApplication`** - starts an application for this badge.

```js
badge.addApplication(application, function (err, application) {
  ...
});
```

* **`addClaimCode`** - add a claim code for the badge

```js
badge.addClaimCode(claimCode, function (err, claimCode) {
  ...
});
```

<!--* **`generateClaimCode`**-->

* **`getInstances`**

```js
badge.getInstances(function (err, instances)) {
  ...
});
```

## Application

```js
var application = new Application(<data>, Badge);
```

<!--
* **`getEvidence`**
 
* **`getEvidenceItem`**
 
* **`addEvidence`**
 
* **`deleteEvidence`**

* **`addComment`**
* **`deleteComment`**
* **`approve`** - approves this application.

  ```
  application.approve(function (err) {
    ...
  });
  ```

* **`deny`** - denies this application.

  ```
  application.deny(function (err) {
    ...
  });
  ```
-->

## System

```js
var system = new System(<data>, Client);
```

* **`getIssuers`** - gets all issuers associated with this system

```js
system.getIssuers(function (err, issuers) {
  ...
});
```

* **`getIssuer`** - gets a specified issuer

```js
system.getIssuer(issuer, function (err, issuer) {
  ...
});
```

* **`addIssuer`** - adds an issuer to this system

```js
system.addIssuer(issuer, function (err, issuer) {
  ...
});
```

## Issuer

```js
var issuer = new Issuer(<data>, System);
```

* **`getPrograms`** - gets all programs associated with this issuer.

```js
issuer.getPrograms(function (err, programs) {
  ...
});
```

* **`getProgram`** - gets a specified program.

```js
issuer.getProgram(program, function (err, program) {
  ...
});
```

* **`addProgram`** - adds a program to this issuer.

```js
issuer.addProgram(program, function (err, program) {
  ...
});
```

## Program

```js
var program = new Program(<data>, Issuer);
```

## ClaimCode

```js
var claimCode = new ClaimCode(<data>, Badge);
```

<!--
* **`claim`** - claims a code (takes email)
-->

## Instance

```js
var instance = new Instance(<data>, Badge);
```
