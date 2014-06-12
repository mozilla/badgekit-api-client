# Programs

The [`Client`](methods.md) object provides the following methods:

* **`getPrograms`**: `[Program]`
  * *Context* requires a `system` and an `issuer`
  * *Returns* all available programs for the given system/issuer

* **`getProgram`**: `Program`
  * *Context* requires a `system` and an `issuer`
  * *Returns* the requested program

* **`createProgram`**: `Program`  
  * *Context* requires a `system`, an issuer, and a full `program`
  * *Returns* the created program

* **`deleteProgram`**: `Program`
  * *Context* requires a `system`, an `issuer`, and a `program`
  * *Returns* the deleted program

* **`updateProgram`**: `Program`
  * *Context* requires a `system`, an `issuer`, and a full `program`
  * *Returns* the updated program
