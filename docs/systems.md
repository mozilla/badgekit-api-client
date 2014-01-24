# Systems

System objects have the following properties:

* ***slug***: `string`  
  Global identifier
* ***name***: `string`  
  Name of the system
* ***description***: `string`  
  Description of the system
* ***imageURL***: `string`|`null`  
  Location of system image, if available

## Client Methods

### `getSystems`

Fetches all systems.

**Parameters**

* *No parameters expected* 

**Returns** an array of 'system' objects.

### `getSystem`

Fetches a single system.

**Parameters**

* *system*: `string`|`object`  
  Slug (or object with `slug` property) identifying system.

**Returns** a single 'system' object.

### `createSystem`

Creates a new system.

**Properties**

* *system*: `object`  
  System object

**Returns** the created system object.

### `deleteSystem`

Deletes an system.

**Properties**

* *slug*: `string`|`object`  
  Slug (or object with `slug` property) identifying system.

**Returns** the deleted system object.

### `updateSystem`

Updates a given system.

**Properties**

* *system*: `object`  
  System object

**Returns** the updated system

## Callbacks

All client methods expect an additional `callback` parameter (after any other identified parameters), which should accept two parameters:

* *error*:  `Error`|`null`  
  Any error raised by the called method
* *data*: `*`  
  Dependent on the method being called

## Object Methods

Returned system objects have the following convenience methods.

### `save`

Maps to `updateSystem`, passing `this` as the system. The following are equivalent:

```
client.getSystem(<slug>, function (err, system) {
  system.name = 'New system name';
  system.save();
}
```

```
client.getSystem(<slug>, function (err, system) {
  system.name = 'New system name';
  client.updateSystem(system);
}
```
