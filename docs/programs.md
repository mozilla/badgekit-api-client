# Programs

Program objects have the following properties:

* ***slug***: `string`  
  Global identifier
* ***name***: `string`  
  Name of the program
* ***description***: `string`  
  Description of the program
* ***imageURL***: `string`|`null`  
  Location of program image, if available

## Client Methods

### `getPrograms`

Fetches all programs.

**Parameters**

* *No parameters expected* 

**Returns** an array of 'program' objects.

### `getProgram`

Fetches a single program.

**Parameters**

* *program*: `string`|`object`  
  Slug (or object with `slug` property) identifying program.

**Returns** a single 'program' object.

### `createProgram`

Creates a new program.

**Properties**

* *program*: `object`  
  Program object

**Returns** the created program object.

### `deleteProgram`

Deletes an program.

**Properties**

* *slug*: `string`|`object`  
  Slug (or object with `slug` property) identifying program.

**Returns** the deleted program object.

### `updateProgram`

Updates a given program.

**Properties**

* *program*: `object`  
  Program object

**Returns** the updated program

## Callbacks

All client methods expect an additional `callback` parameter (after any other identified parameters), which should accept two parameters:

* *error*:  `Error`|`null`  
  Any error raised by the called method
* *data*: `*`  
  Dependent on the method being called

## Object Methods

Returned program objects have the following convenience methods.

### `save`

Maps to `updateProgram`, passing `this` as the program. The following are equivalent:

```
client.getProgram(<slug>, function (err, program) {
  program.name = 'New program name';
  program.save();
}
```

```
client.getProgram(<slug>, function (err, program) {
  program.name = 'New program name';
  client.updateProgram(program);
}
```
