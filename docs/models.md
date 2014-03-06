# Models

Models are created either from a simple identifier, or a full object describing the model instance. Model instances also require a parent, which will vary depending on the context. `Badges` require a `System`, `Issuer` or `Program`, for example, while `Applications` require a `Badge`. With that said, client consumers will never actually need to construct model instances.

```
var item = new Model('item-slug', <parent>);
```

Is equivalent to:

```
var item = new Model({
  slug: 'item-slug'
}, <parent>);
```

Alternatively, with a full context.

```
var item = new Model({
  slug: 'item-slug',
  name: 'Item Name',
  description: 'Item Description',
  image: '/path/to/local/image.png'
}, <parent>);
```

## Common methods

* **`create`** - saves new model instance.

  ```
  item.create(function (err, item) {
    ...
  });
  ```

* **`load`** - loads model instance data.

  ```
  item.load(function (err, item) {
    ...
  });
  ```

* **`save`** - saves updated model instance.

  ```
  item.save(function (err, item) {
    ...
  });
  ```

* **`delete`** - deletes model instance.

  ```
  item.delete(function (err, item) {
    ...
  });
  ```

Additionally, `Systems`, `Issuers` and `Programs` all have the following shared methods:

* **getBadges** - loads all associated badges.

  ```
  item.getBadges(function (err, badges) {
    ...
  });
  ```

* **getBadge** - loads an associated badge.

  ```
  item.getBadge(badge, function (err, badge) {
    ...
  });
  ```

* **addBadge** - adds a badge to this instance.

  ```
  item.addBadge(badge, function (err, badge) {
    ...
  });
  ```

Along with `Badges`, `Systems`/`Issuers`/`Programs` also have these methods:

* **getApplications** - gets all associated badge applications.

  ```
  item.getApplications(function (err, applications) {
    ...
  });
  ```

* **getClaimCodes** - gets all associated claim codes.

  ```
  item.getClaimCodes(function (err, claimCodes) {
    ...
  });
  ```


## Application

```
var application = new Application(<data>, Badge);
```

* ~~**`getEvidence`**~~

  *TO DO*

* ~~**`getEvidenceItem`**~~

  *TO DO*

* ~~**`addEvidence`**~~

  *TO DO*

* ~~**`deleteEvidence`**~~

  *TO DO*

* ~~**`addComment`**~~

  *TO DO*

* ~~**`deleteComment`**~~

  *TO DO*

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

## Badge

```
var badge = new Badge(<data>, System|Issuer|Program);
```

* **`addApplication`** - starts an application for this badge.

  ```
  badge.addApplication(application, function (err, application) {
    ...
  });
  ```

* ~~**`addClaimCode`**~~

  *TO DO*

* ~~**`generateClaimCode`**~~

  *TO DO*

* ~~**`getInstances`**~~

  *TO DO*

## Issuer

```
var issuer = new Issuer(<data>, System);
```

* **`getPrograms`** - gets all programs associated with this issuer.

  ```
  issuer.getPrograms(function (err, programs) {
    ...
  });
  ```

* **`getProgram`** - gets a specified program.

  ```
  issuer.getProgram(program, function (err, program) {
    ...
  });
  ```

* **`addProgram`** - adds a program to this issuer.

  ```
  issuer.addProgram(program, function (err, program) {
    ...
  });
  ```

## Program

```
var program = new Program(<data>, Issuer);
```

Programs have no additional methods.

## System

```
var system = new System(<data>, Client);
```

* **getIssuers** - gets all issuers associated with this system

  ```
  system.getIssuers(function (err, issuers) {
    ...
  });
  ```

* **getIssuer** - gets a specified issuer

  ```
  system.getIssuer(issuer, function (err, issuer) {
    ...
  });
  ```

* **addIssuer** - adds an issuer to this system

  ```
  system.addIssuer(issuer, function (err, issuer) {
    ...
  });
  ```
