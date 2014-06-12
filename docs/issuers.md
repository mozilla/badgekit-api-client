# Issuers

The [`Client`](methods.md) object provides the following methods:

* **`getIssuers`**: `[Issuer]`
  * *Context* requires a `system`
  * *Returns* all available issuers for the given system

* **`getIssuer`**: `Issuer`
  * *Context* requires a `system` and an `issuer`
  * *Returns* the requested issuer

* **`createIssuer`**: `Issuer`  
  * *Context* requires a `system` and a full `issuer`
  * *Returns* the created issuer

* **`deleteIssuer`**: `Issuer`
  * *Context* requires a `system` and an `issuer`
  * *Returns* the deleted system

* **`updateIssuer`**: `Issuer`
  * *Context* requires a `system` and a full `issuer`
  * *Returns* the updated system
