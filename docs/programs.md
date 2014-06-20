# Programs

Programs represent the lowest-level of admin in BadgeKit API. Each program belongs to a single [issuer](issuers.md), which in turn belongs to a [system](systems.md). Badges may be associated with a particular program.

_Each program exists within the context of a system and issuer._

The [`Client`](methods.md) object provides the following methods:

* [`getPrograms`](#getprograms-program)
* [`getProgram`](#getprogram-program)
* [`createProgram`](#createprorgam-program)
* [`deleteProgram`](#deleteprogram-program)
* [`updateProgram`](#updateprogram-program)

## `getPrograms`: `[Program]`

Retrieve all available programs within a particular issuer and system.

### Context

| |**Required**|
|:---|:---|
|system|`slug`|
|issuer|`slug`|

### Returns

All available `programs` for the given system/ issuer.

### Example method call

```js
client.getPrograms({system: 'system-slug', issuer: 'issuer-slug'}, function (err, availablePrograms) {
  //...
  
});
```

### Expected response

```json
[
 {
  "id": 1,
  "slug": "program-slug",
  "url": "http://programsite.com",
  "name": "Program Name",
  "description": "Program description.",
  "email": "admin@programsite.com",
  "imageUrl": "http://programsite.com/image.jpg"
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

### Potential errors

System OR issuer not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]
```

Missing system OR issuer.

```
[ContextError: Missing system]

[ContextError: Missing issuer]
```

Incorrect context.

```
[ContextError: Context not of required type: Issuer]
```

_If the specified system/ issuer does not contain any programs, the client will return an empty array._

## `getProgram`: `Program`

Retrieve a specific program.

### Context

| |**Required**|
|:---|:---|
|system|`slug`|
|issuer|`slug`|
|program|`slug`|

### Returns

The requested `program`.

### Example method call

```js
client.getProgram({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug'}, function (err, requestedProgram) {
  //...
  
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "program-slug",
 "url": "http://programsite.com",
 "name": "Program Name",
 "description": "Program description.",
 "email": "admin@programsite.com",
 "imageUrl": "http://programsite.com/image.jpg"
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

### Potential errors

System, issuer OR program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Missing system OR issuer.

```
[ContextError: Missing system]

[ContextError: Missing issuer]
```

Incorrect context.

```
[ContextError: Context not of required type: Program]
```

## `createProgram`: `Program`  

Create a new program within a system and issuer.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|program|`description`|
|issuer|`slug`| |`email`|
|program|`slug`| |`imageUrl`|
| |`name`| | |
| |`url`| | |

### Returns

The created `program`.

### Example method call

```js
var newProgram = 
	{
		"id": 7,
		"slug": "new-program",
		"name": "New Program",
		"url": "http://programsite.com",
		"description": "Program description.",
		"email": "admin@programsite.com",
		"imageUrl": "http://programsite.com/image.jpg"
	};		
client.createProgram({system: 'system-slug', issuer: 'issuer-slug', program: newProgram}, function (err, createdProgram) {
 //...
  
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "new-program",
 "url": "http://programsite.com",
 "name": "New Program",
 "description": "Program description.",
 "email": "admin@programsite.com",
 "imageUrl": "http://programsite.com/image.jpg"
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

### Potential errors

Program data invalid.

```
[ValidationError: Could not validate required fields]
```

System OR issuer not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]
```

Missing system OR issuer.

```
[ContextError: Missing system]

[ContextError: Missing issuer]
```

Incorrect context.

```
[ContextError: Context not of required type: Program]
```

## `deleteProgram`: `Program`

Delete an existing program within a system and issuer.

### Context

| |**Required**|
|:---|:---|
|system|`slug`|
|issuer|`slug`|
|program|`slug`|

### Returns

The deleted `program`.

### Example method call

```js
client.deleteProgram({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug'}, function (err, deletedProgram) {
 //...
  
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "program-slug",
 "url": "http://programsite.com",
 "name": "Program Name",
 "description": "Program description.",
 "email": "admin@programsite.com",
 "imageUrl": "http://programsite.com/image.jpg"
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

### Potential errors

System, issuer OR program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Missing system OR issuer.

```
[ContextError: Missing system]

[ContextError: Missing issuer]
```

Incorrect context.

```
[ContextError: Context not of required type: Program]
```

## `updateProgram`: `Program`

Update an existing program within a system and issuer.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|program|`name`|
|issuer|`slug`| |`url`|
|program|`slug`| |`description`|
| | | |`email`|
| | | |`imageUrl`|

### Returns

The updated `program`.

### Example method call

```js
var editedProgram = 
	{
		"slug": "program-slug",
		"name": "New Program Name"
		//,...
	};		
client.updateProgram({system: 'system-slug', issuer: 'issuer-slug', program: editedProgram}, function (err, updatedProgram) {
	 //...
  
});
```

### Expected response

```json
{
 "id": 1,
 "slug": "program-slug",
 "url": "http://programsite.com",
 "name": "New Program Name",
 "description": "Program description.",
 "email": "admin@programsite.com",
 "imageUrl": "http://programsite.com/image.jpg"
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

### Potential errors

System, issuer OR program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Program data invalid.

```
[ValidationError: Could not validate required fields]
```

Missing system OR issuer.

```
[ContextError: Missing system]

[ContextError: Missing issuer]
```

Incorrect context.

```
[ContextError: Context not of required type: Program]
```
