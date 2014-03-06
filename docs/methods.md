# Client Methods

<a name="systems"></a>
## Systems

* **`getSystems`**: `[System]`
  * *Context* is not required
  * *Returns* all available systems

* **`getSystem`**: `System`
  * *Context* requires a `system`
  * *Returns* the requested system

* **`createSystem`**: `System`
  * *Context* requires a full `system`
  * *Returns* the created system

* **`deleteSystem`**: `System`
  * *Context* requires a `system`
  * *Returns* the deleted system

* **`updateSystem`**: `System`
  * *Context* requires a full `system`
  * *Returns* the updated system

<a name="issuers"></a>
## Issuers

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

<a name="programs"></a>
## Programs

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

<a name="badges"></a>
## Badges

* **`getBadges`**: `[Badge]`
  * *Context* is variable, depending on the badge, but requires at least a `system`, and potentially an `issuer` and `program`
  * *Returns* all available badges for the given system/issuer/program

* **`getAllBadges`**: `[Badge]`
  * *Context* is variable
  * *Returns* all available badges, including those marked as 'archived'

* **`getBadge`**: `Badge`
  * *Context* is variable, as with `getBadges`, but also requires a `badge`
  * *Returns* the requested badge

* **`createBadge`**: `Badge`  
  * *Context* is variable, but does require a full `badge`
  * *Returns* the created badge

* **`deleteBadge`**: `Badge`
  * *Context* is variable, but does require a `badge`
  * *Returns* the deleted badge

* **`updateBadge`**: `Badge`
  * *Context* is variable, but does require a full `badge`
  * *Returns* the updated badge

<a name="claimCodes"></a>
## Claim Codes

*TO DO*

<a name="issuing"></a>
## Issuing

*TO DO*

<a name="assessment"></a>
## Assessment

*TO DO*




