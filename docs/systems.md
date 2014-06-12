# Systems

System is the top level of admin in BadgeKit. Each BadgeKit API instance is associated with at least a single system. Each system can contain one or more [issuer](issuers.md), with each issuer containing one or more [programs](programs.md). Badges may be associated with a system, issuer or program. Badge issuers can use these admin levels in whatever way suits the needs of their own projects and communities. 

For example, a system could be a city authority, with issuers representing badging organizations within the authority, such as schools, libraries, museums etc, and programs representing events or education programs. _If you do not need these admin levels, you can simply organize all of your badges into a single system._

The [`Client`](methods.md) object provides the following methods:

* [`getSystems`](#getsystems-system) 
* [`getSystem`](#getsystem-system)
* [`createSystem`](#createsystem-system)
* [`deleteSystem`](#deletesystem-system)
* [`updateSystem`](#updatesystem-system)

## `getSystems`: `[System]` 

Retrieve all available systems.

* *Context* - is not required
* *Returns* - array containing available systems

### Example method call

```js
client.getSystems(function (err, availableSystems) {
  //...
  
});
```

### Expected response

```json
{
  "id": 1,
  "slug": "system-slug",
  "url": "http://systemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
{
  "id": 2,
  "slug": "system-slug",
  "url": "http://systemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
...
```

#### Response structure

* id
* slug
* url
* name
* email
* imageUrl
* [issuers](issuers.md) `[ ]`

### Potential errors

None.

## `getSystem`: `System`

Retrieve a specific system.

* *Context* - requires a `system` (identified using its `slug`)
* *Returns* - the requested `system`

### Example method call

```js
client.getSystem({system: 'system-slug'}, function (err, requestedSystem) {
  //...
  
});
```

### Expected response

```json
{
  "id": 1,
  "slug": "system-slug",
  "url": "http://systemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
```

#### Response structure

* id
* slug
* url
* name
* email
* imageUrl
* [issuers](issuers.md) `[ ]`

### Potential errors

System not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]
```

## `createSystem`: `System`

Create a new system.

* *Context* - requires the new `system`:
 * __required__: `slug`, `name`, `url`
 * __optional__: `id`, `description`, `email`, `imageUrl`, `[issuers]`
* *Returns* - the created `system`

### Example method call

```js
var newSystem = {
		system:
		{
		  "id": 3,
 		 "slug": "system-slug",
 		 "url": "http://systemsite.com",
 		 "name": "System Name",
 		 "description": "System description",
 		 "email": "admin@systemsite.com",
 		 "imageUrl": "http://systemsite.com/image.jpg",
 		 "issuers": []
		}
	};
	client.createSystem(newSystem, function (err, createdSystem) {
	  //...
	
	});
```

### Expected response 

```json
{
  "id": 3,
  "slug": "system-slug",
  "url": "http://systemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
```

#### Response structure

* id
* slug
* url
* name
* email
* imageUrl
* [issuers](issuers.md) `[ ]`

### Potential errors

System data invalid.

```
[ValidationError: Could not validate required fields]
```

## `deleteSystem`: `System`

Delete an existing system.

* *Context* - requires a `system` (identified using its 'slug')
* *Returns* - the deleted `system`

### Example method call

```js
client.deleteSystem({system: 'system-slug'}, function (err, deletedSystem) {
  //...
  
});
```

### Expected response

```json
{
  "id": 3,
  "slug": "system-slug",
  "url": "http://systemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
```

#### Response structure

* id
* slug
* url
* name
* email
* imageUrl
* [issuers](issuers.md) `[ ]`

### Potential errors

System not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]
```

## `updateSystem`: `System`

Update an existing system.

* *Context* - requires a `system` - (identified using its `slug` _also passing data for any fields you are updating_)
* *Returns* - the updated `system`

### Example method call

```js
var editedSystem = {
	system:
	{
		"slug": "system-slug",
		"url": "http://newsystemsite.com"
	}
};
client.updateSystem(editedSystem, function (err, updatedSystem) {
  //...
  
});
```

### Expected response

```json
{
  "id": 1,
  "slug": "system-slug",
  "url": "http://newsystemsite.com",
  "name": "System Name",
  "email": "admin@systemsite.com",
  "imageUrl": "http://systemsite.com/image.jpg",
  "issuers": []
}
```

#### Response structure

* id
* slug
* url
* name
* email
* imageUrl
* [issuers](issuers.md) `[ ]`

### Potential errors

System not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]
```
