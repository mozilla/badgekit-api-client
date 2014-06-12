# Badges

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

* **`getBadgeFromCode`**: `Badge`
  * *Context* is variable
  * *Code* query code
  * *Returns* the requested badge
