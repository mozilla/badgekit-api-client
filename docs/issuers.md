# Issuers

Issuers represent mid-level badging admin in BadgeKit API. Each issuer is part of a single [system](systems.md), potentially along with other issuers. An issuer can contain one or more programs. Badges may be associated with a particular issuer.

The [`Client`](methods.md) object provides the following methods:

* [`getIssuers`](#getissuers-issuer)
* [`getIssuer`](#getissuer-issuer)
* [`createIssuer`](#createissuer-issuer)
* [`deleteIssuer`](#deleteissuer-issuer)
* [`updateIssuer`](#updateissuer-issuer)

## `getIssuers`: `[Issuer]`

Retrieve all available issuers within a particular system.

* *Context* - requires a `system` (identified by its `slug`)
* *Returns* - all available `issuers` for the given `system`

### Example method call

```js
client.getIssuers({system: 'system-slug'}, function (err, availableIssuers) {
  //...
  
});
```

### Expected response

```json
[
 {
  "id": 1,
  "slug": "issuer-slug",
  "url": "http://issuersite.com",
  "name": "Issuer Name",
  "description": "Issuer description.",
  "email": "admin@issuersite.com",
  "imageUrl": "http://issuersite.com/image.jpg",
  "programs": []
  },
  ...
]
```

#### Response structure

* `[ ]`
 * id
 * slug
 * url
 * name
 * description
 * email
 * imageUrl
 * [programs](programs.md) `[ ]`
 
### Potential errors

System not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]
```

_If the specified system does not contain any issuers, the client will return an empty array._

## `getIssuer`: `Issuer`

Retrieve a specific issuer.

* *Context* - requires a `system` and an `issuer` (both identified by their `slugs`)
* *Returns* - the requested `issuer`

### Example method call

```js
client.getIssuer({system: 'system-slug', issuer: 'issuer-slug'}, function (err, requestedIssuer) {
 //...
 
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "issuer-slug",
 "url": "http://issuersite.com",
 "name": "Issuer Name",
 "description": "Issuer description.",
 "email": "admin@issuersite.com",
 "imageUrl": "http://issuersite.com/image.jpg",
 "programs": []
}
```

#### Response structure

* id
* slug
* url
* name
* description
* email
* imageUrl
* [programs](programs.md) `[ ]`

### Potential errors

System OR issuer not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]
```

## `createIssuer`: `Issuer`

Create a new issuer within a system context.

* *Context* - requires a `system` (identifed by its `slug`) and the `issuer` you are creating:
 * __required__: `slug`, `name`, `url`
 * __optional__: `id`, `description`, `email`, `imageUrl`, `[programs]`
* *Returns* - the created `issuer`

### Example method call

```js
var newIssuer = 
	{
	 "id": 5,
		"slug": "new-issuer",
		"url": "http://newissuersite.com",
		"name": "New Issuer",
		"description": "New issuer description.",
		"email": "admin@newissuersite.com",
		"imageUrl": "http://newissuersite.com/image.jpg",
		"programs": []
	};
client.createIssuer({system: 'system-slug', issuer: newIssuer}, function (err, createdIssuer) {
 //...

});
```

### Expected response

```json
{
 "id": 1,
 "slug": "new-issuer",
 "url": "http://newissuersite.com",
 "name": "New Issuer",
 "description": "New Issuer description.",
 "email": "admin@newissuersite.com",
 "imageUrl": "http://newissuersite.com/image.jpg",
 "programs": []
}
```

#### Response structure

* id
* slug
* url
* name
* description
* email
* imageUrl
* [programs](programs.md) `[ ]`

### Potential errors

Issuer data invalid.

```
[ValidationError: Could not validate required fields]
```

System not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]
```

## `deleteIssuer`: `Issuer`

Delete an existing issuer.

* *Context* - requires a `system` and an `issuer` (both identified by their `slugs`)
* *Returns* - the deleted `issuer`

### Example method call

```js
client.deleteIssuer({system: 'badgekit', issuer: 'top-museum'}, function (err, returnedData) {
 //...
 
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "issuer-slug",
 "url": "http://issuersite.com",
 "name": "Issuer Name",
 "description": "Issuer description.",
 "email": "admin@issuersite.com",
 "imageUrl": "http://issuersite.com/image.jpg",
 "programs": []
}
```

#### Response structure

* id
* slug
* url
* name
* description
* email
* imageUrl
* [programs](programs.md) `[ ]`

### Potential errors

System OR issuer not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]
```

## `updateIssuer`: `Issuer`

Update an existing issuer.

* *Context* - requires a `system` (identified by its `slug`) and the `issuer` you are updating:
 * __required__: `slug`
 * __optional__: `id`, `name`, `url`, `description`, `email`, `imageUrl`, `[programs]`
* *Returns* - the updated `issuer`

### Example method call

```js
var editedIssuer = 
	{
		"slug": "issuer-slug",
		"name": "New Issuer Name"
	};		
client.updateIssuer({system: 'system-slug', issuer: editedIssuer}, function (err, updatedIssuer) {
 //...
 
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "issuer-slug",
 "url": "http://issuersite.com",
 "name": "New Issuer Name",
 "description": "Issuer description.",
 "email": "admin@issuersite.com",
 "imageUrl": "http://issuersite.com/image.jpg",
 "programs": []
}
```

#### Response structure

* id
* slug
* url
* name
* description
* email
* imageUrl
* [programs](programs.md) `[ ]`

### Potential errors

System OR issuer not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]
```

Issuer data invalid.

```
[ValidationError: Could not validate required fields]
```
