# Issuers

Issuer objects have the following properties:

* ***slug***: `string`  
  Global identifier
* ***name***: `string`  
  Name of the issuer
* ***description***: `string`  
  Description of the issuer
* ***imageURL***: `string`|`null`  
  Location of issuer image, if available

## Client Methods

### `getIssuers`

Fetches all issuers.

**Parameters**

* *No parameters expected* 

**Returns** an array of 'issuer' objects.

### `getIssuer`

Fetches a single issuer.

**Parameters**

* *issuer*: `string`|`object`  
  Slug (or object with `slug` property) identifying issuer.

**Returns** a single 'issuer' object.

### `createIssuer`

Creates a new issuer.

**Properties**

* *issuer*: `object`  
  Issuer object

**Returns** the action status.

**@TODO** - should return the created issuer object.

### `deleteIssuer`

Deletes an issuer.

**Properties**

* *slug*: `string`|`object`  
  Slug (or object with `slug` property) identifying issuer.

**Returns** the action status.

**@TODO** - should return the deleted issuer object.

### `updateIssuer`

Updates a given issuer.

**Properties**

* *issuer*: `object`  
  Issuer object

**Returns** the action status.

**@TODO** - should return the updated issuer object.

## Callbacks

All client methods expect an additional `callback` parameter (after any other identified parameters), which should accept two parameters:

* *error*:  `Error`|`null`  
  Any error raised by the called method
* *data*: `*`  
  Dependent on the method being called

## Object Methods

Returned issuer objects have the following convenience methods.

### `save`

Maps to `updateIssuer`, passing `this` as the issuer. The following are equivalent:

```
client.getIssuer(<slug>, function (err, issuer) {
  issuer.name = 'New issuer name';
  issuer.save();
}
```

```
client.getIssuer(<slug>, function (err, issuer) {
  issuer.name = 'New issuer name';
  client.updateIssuer(issuer);
}
```
