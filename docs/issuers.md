# Issuers

Issuers represent mid-level badging admin in BadgeKit API. Each issuer is part of a single [system](systems.md), potentially along with other issuers. An issuer can contain one or more [programs](programs.md). Badges may be associated with a particular issuer.

_Each issuer exists within the context of a system._

The [`Client`](methods.md) object provides the following methods:

* [`getIssuers`](#getissuers-issuer)
* [`getIssuer`](#getissuer-issuer)
* [`createIssuer`](#createissuer-issuer)
* [`deleteIssuer`](#deleteissuer-issuer)
* [`updateIssuer`](#updateissuer-issuer)

## `getIssuers`: `[Issuer]`

Retrieve all available issuers within a particular system.

### Context

| |**Required**|
|:---|:---|
|system|`slug`|

### Returns

All available `issuers` for the given `system`.

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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: System]
```

_If the specified system does not contain any issuers, the client will return an empty array._

## `getIssuer`: `Issuer`

Retrieve a specific issuer.

### Context 

| |**Required**|
|:---|:---|
|system|`slug`|
|issuer|`slug`|

### Returns

The requested `issuer`.

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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Issuer]
```

## `createIssuer`: `Issuer`

Create a new issuer within a system context.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`description`|
|issuer|`slug`| |`email`|
| |`name`| |`imageUrl`|
| |`url`| |`programs` `[ ]`|

### Returns

The created `issuer`.

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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Issuer]
```

## `deleteIssuer`: `Issuer`

Delete an existing issuer.

### Context

| |**Required**|
|:---|:---|
|system|`slug`|
|issuer|`slug`|

### Returns

The deleted `issuer`.

### Example method call

```js
client.deleteIssuer({system: 'system-slug', issuer: 'issuer-slug'}, function (err, deletedIssuer) {
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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Issuer]
```

## `updateIssuer`: `Issuer`

Update an existing issuer.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`name`|
|issuer|`slug`| |`name`|
| | | |`url`|
| | | |`description`|
| | | |`email`|
| | | |`imageUrl`|
| | | |`programs` `[ ]`|

### Returns

The updated `issuer`.

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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Issuer]
```
