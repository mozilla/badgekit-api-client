# Systems

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

* *Context* - requires a `system` (only `slug` is required)
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

* *Context* requires a `system` - only 'slug' is required
* *Returns* the deleted `system`

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

* *Context* requires a `system` - `slug` is required _plus any fields you are updating_
* *Returns* the updated `system`

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
