# Badges

BadgeKit models badges in two ways: generic badges and badge instances (specific badges awarded to earners). A badge is represented by a series of data items to support various parts of the badging process (including information for earners, reviewers and consumers interested in an earner's badges). When creating a badge, you can include information that will aid the assessment process, defining badge criteria and guidance for reviewers. 

When an earner is awarded a badge, BadgeKit creates a badge instance, including the badge earned and the email address for the earner - see [issuing](issuing.md) for information about badge instances. This document regards generic earnable badges, which would for example be listed on issuer sites and made available for earner applications.

_Each badge exists within the context of a system, issuer or program._

The [`Client`](methods.md) object provides the following methods:

* [`getBadges`](#getbadges-badge)
* [`getAllBadges`](#getallbadges-badge)
* [`getBadge`](#getbadge-badge)
* [`createBadge`](#createbadge-badge)
* [`deleteBadge`](#deletebadge-badge)
* [`updateBadge`](#updatebadge-badge)
* [`getBadgeFromCode`](#getbadgefromcode-badge)

## `getBadges`: `[Badge]`

Get available (published) badges within the system, issuer or program context.

### Context:

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
| | |program|`slug`|

### Returns

All available (published) `badges` for the given context.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug'
	};
client.getBadges(context, function (err, availableBadges) {
 //...
  
});
```

### Expected response

```json
[
    {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        "strapline": "Badge strapline.",
        "earnerDescription": "Description for earners.",
        "consumerDescription": "Description for consumers.",
        "issuerUrl": "http://badgeissuersite.com",
        "rubricUrl": "http://badgeissuersite.com/rubric",
        "timeValue": 0,
        "timeUnits": "minutes",
        "limit": 0,
        "unique": 0,
        "created": "2014-06-11T15:36:49.000Z",
        "imageUrl": "http://badgeissuersite.com/image.jpg",
        "type": "badge type",
        "archived": false,
        "system": {
            "id": 1,
            "slug": "system-slug",
            "url": "http://systemsite.com",
            "name": "System Name",
            "description": "System description.",
            "email": "admin@systemsite.com",
            "imageUrl": "http://systemsite.com/image.jpg",
            "issuers": [ ]
        },
        "issuer": {
            "id": 1,
            "slug": "issuer-slug",
            "url": "http://issuersite.com",
            "name": "Issuer Name",
            "description": "Issuer description",
            "email": "admin@issuersite.com",
            "imageUrl": "http://issuersite.com/image.jpg",
            "programs": [ ]
        },
        "program": {
            "id": 1,
            "slug": "program-slug",
            "url": "http://programsite.com",
            "name": "Program Name",
            "description": "Program description.",
            "email": "admin@programsite.com",
            "imageUrl": "http://programsite.com/image.jpg"
        },
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [
            {
                "id": 1,
                "description": "Criteria description.",
                "required": 1,
                "note": "Note for reviewer."
            }
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    ...
]
```

#### Response structure

* `[ ]`
 * id
 * slug
 * name
 * strapline
 * earnerDescription
 * consumerDescription
 * issuerUrl
 * rubricUrl
 * timeValue
 * timeUnits
 * limit
 * unique
 * created
 * imageUrl
 * type
 * archived
 * [system](systems.md)
 * [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
 * [program](programs.md) (_only returned where badge belongs to a program_)
 * criteriaUrl
 * criteria `[ ]`
    * id
    * description
    * required
    * note
 * alignments `[ ]`
 * evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
 * categories `[ ]`
 * tags `[ ]`
 * milestones `[ ]`

### Potential errors

System, issuer or program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

_If the specified system/ issuer/ program does not contain any badges, the client will return an empty array._

##  `getAllBadges`: `[Badge]`

Get all badges for a system, issuer or program, including archived badges (archived badges are not available for earning but existing earners can continue to display them).

### Context

| |**Required**| |**Optional**|
|:---|:---|:---:|---|
|system|`slug`|issuer|`slug`|
| | |program|`slug`|

### Returns

All `badges`, including those marked as `archived`.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug'
	};
client.getAllBadges(context, function (err, allAvailableBadges) {
 //...
  
});
```

### Expected response

```json
[
    {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        "strapline": "Badge strapline.",
        "earnerDescription": "Description for earners.",
        "consumerDescription": "Description for consumers.",
        "issuerUrl": "http://badgeissuersite.com",
        "rubricUrl": "http://badgeissuersite.com/rubric",
        "timeValue": 0,
        "timeUnits": "minutes",
        "limit": 0,
        "unique": 0,
        "created": "2014-06-11T15:36:49.000Z",
        "imageUrl": "http://badgeissuersite.com/image.jpg",
        "type": "badge type",
        "archived": false,
        "system": {
            "id": 1,
            "slug": "system-slug",
            "url": "http://systemsite.com",
            "name": "System Name",
            "description": "System description.",
            "email": "admin@systemsite.com",
            "imageUrl": "http://systemsite.com/image.jpg",
            "issuers": [ ]
        },
        "issuer": {
            "id": 1,
            "slug": "issuer-slug",
            "url": "http://issuersite.com",
            "name": "Issuer Name",
            "description": "Issuer description",
            "email": "admin@issuersite.com",
            "imageUrl": "http://issuersite.com/image.jpg",
            "programs": [ ]
        },
        "program": {
            "id": 1,
            "slug": "program-slug",
            "url": "http://programsite.com",
            "name": "Program Name",
            "description": "Program description.",
            "email": "admin@programsite.com",
            "imageUrl": "http://programsite.com/image.jpg"
        },
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [
            {
                "id": 1,
                "description": "Criteria description.",
                "required": 1,
                "note": "Note for reviewer."
            }
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    ...
]
```

#### Response structure

* `[ ]`
 * id
 * slug
 * name
 * strapline
 * earnerDescription
 * consumerDescription
 * issuerUrl
 * rubricUrl
 * timeValue
 * timeUnits
 * limit
 * unique
 * created
 * imageUrl
 * type
 * archived
 * [system](systems.md)
 * [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
 * [program](programs.md) (_only returned where badge belongs to a program_)
 * criteriaUrl
 * criteria `[ ]`
    * id
    * description
    * required
    * note
 * alignments `[ ]`
 * evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
 * categories `[ ]`
 * tags `[ ]`
 * milestones `[ ]`

### Potential errors

System, issuer or program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

_If the specified system/ issuer/ program does not contain any badges, the client will return an empty array._

## `getBadge`: `Badge`

Retrieve a particular badge.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|

### Returns

The requested `badge`.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug'
	};
client.getBadge(context, function (err, requestedBadge) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "badge-slug",
    "name": "Badge Name",
    "strapline": "Badge strapline.",
    "earnerDescription": "Description for earners.",
    "consumerDescription": "Description for consumers.",
    "issuerUrl": "http://badgeissuersite.com",
    "rubricUrl": "http://badgeissuersite.com/rubric",
    "timeValue": 0,
    "timeUnits": "minutes",
    "limit": 0,
    "unique": 0,
    "created": "2014-06-11T15:36:49.000Z",
    "imageUrl": "http://badgeissuersite.com/image.jpg",
    "type": "badge type",
    "archived": false,
    "system": {
        "id": 1,
        "slug": "system-slug",
        "url": "http://systemsite.com",
        "name": "System Name",
        "description": "System description.",
        "email": "admin@systemsite.com",
        "imageUrl": "http://systemsite.com/image.jpg",
        "issuers": [ ]
    },
    "issuer": {
        "id": 1,
        "slug": "issuer-slug",
        "url": "http://issuersite.com",
        "name": "Issuer Name",
        "description": "Issuer description",
        "email": "admin@issuersite.com",
        "imageUrl": "http://issuersite.com/image.jpg",
        "programs": [ ]
    },
    "program": {
        "id": 1,
        "slug": "program-slug",
        "url": "http://programsite.com",
        "name": "Program Name",
        "description": "Program description.",
        "email": "admin@programsite.com",
        "imageUrl": "http://programsite.com/image.jpg"
    },
    "criteriaUrl": "http://badgeissuersite.com/criteria",
    "criteria": [
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        }
    ],
    "alignments": [ ],
    "evidenceType": "image",
    "categories": [ ],
    "tags": [ ],
    "milestones": [ ]
}
```

#### Response structure

* id
* slug
* name
* strapline
* earnerDescription
* consumerDescription
* issuerUrl
* rubricUrl
* timeValue
* timeUnits
* limit
* unique
* created
* imageUrl
* type
* archived
* [system](systems.md)
* [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
* [program](programs.md) (_only returned where badge belongs to a program_)
* criteriaUrl
* criteria `[ ]`
  * id
  * description
  * required
  * note
* alignments `[ ]`
* evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
* categories `[ ]`
* tags `[ ]`
* milestones `[ ]`

### Potential errors

System, issuer, program or badge not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Badge]
```

## `createBadge`: `Badge`

Create a new badge within a system, issuer or program context.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`name`|program|`slug`| 
| |`earnerDescription`|badge|`strapline`|
| |`consumerDescription`| |`issuerUrl`|
| |`criteriaUrl`| |`rubricUrl`|
| |`unique`| |`timeValue`|
| |`type`| |`timeUnits`|
| |`image`| |`evidenceType`|
| | | |`limit`|
| | | |`archived`|
| | | |`criteria` `[ ]` (`description`, `required`, `note`)|
| | | |`categories` `[ ]`|
| | | |`tags` `[ ]`|

### Returns

The created `badge`.

### Example method call

```js
var newBadge = 
		{
			"name": "New Badge Name",
			"type": "badge type",
			"earnerDescription": "Description for earners.",
			"consumerDescription": "Description for consumers.",
			"criteriaUrl": "http://badgeissuersite.com/criteria",
			"unique": false,
			"image": "http://badgeissuersite.com/image.jpg",
			//...
		};
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: newBadge
	};
client.createBadge(context, function (err, createdBadge) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "badge-slug",
    "name": "New Badge Name",
    "strapline": "Badge strapline.",
    "earnerDescription": "Description for earners.",
    "consumerDescription": "Description for consumers.",
    "issuerUrl": "http://badgeissuersite.com",
    "rubricUrl": "http://badgeissuersite.com/rubric",
    "timeValue": 0,
    "timeUnits": "minutes",
    "limit": 0,
    "unique": 0,
    "created": "2014-06-11T15:36:49.000Z",
    "imageUrl": "http://badgeissuersite.com/image.jpg",
    "type": "badge type",
    "archived": false,
    "system": {
        "id": 1,
        "slug": "system-slug",
        "url": "http://systemsite.com",
        "name": "System Name",
        "description": "System description.",
        "email": "admin@systemsite.com",
        "imageUrl": "http://systemsite.com/image.jpg",
        "issuers": [ ]
    },
    "issuer": {
        "id": 1,
        "slug": "issuer-slug",
        "url": "http://issuersite.com",
        "name": "Issuer Name",
        "description": "Issuer description",
        "email": "admin@issuersite.com",
        "imageUrl": "http://issuersite.com/image.jpg",
        "programs": [ ]
    },
    "program": {
        "id": 1,
        "slug": "program-slug",
        "url": "http://programsite.com",
        "name": "Program Name",
        "description": "Program description.",
        "email": "admin@programsite.com",
        "imageUrl": "http://programsite.com/image.jpg"
    },
    "criteriaUrl": "http://badgeissuersite.com/criteria",
    "criteria": [
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        }
    ],
    "alignments": [ ],
    "evidenceType": "image",
    "categories": [ ],
    "tags": [ ],
    "milestones": [ ]
}
```

#### Response structure

* id
* slug
* name
* strapline
* earnerDescription
* consumerDescription
* issuerUrl
* rubricUrl
* timeValue
* timeUnits
* limit
* unique
* created
* imageUrl
* type
* archived
* [system](systems.md)
* [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
* [program](programs.md) (_only returned where badge belongs to a program_)
* criteriaUrl
* criteria `[ ]`
  * id
  * description
  * required
  * note
* alignments `[ ]`
* evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
* categories `[ ]`
* tags `[ ]`
* milestones `[ ]`

### Potential errors

Badge data invalid.

```
[ValidationError: Could not validate required fields]
```

System, issuer or program not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Badge]
```

## `deleteBadge`: `Badge`

Delete an existing badge.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|

### Returns

The deleted `badge`.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug'
	};
client.deleteBadge(context, function (err, deletedBadge) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "badge-slug",
    "name": "New Badge Name",
    "strapline": "Badge strapline.",
    "earnerDescription": "Description for earners.",
    "consumerDescription": "Description for consumers.",
    "issuerUrl": "http://badgeissuersite.com",
    "rubricUrl": "http://badgeissuersite.com/rubric",
    "timeValue": 0,
    "timeUnits": "minutes",
    "limit": 0,
    "unique": 0,
    "created": "2014-06-11T15:36:49.000Z",
    "imageUrl": "http://badgeissuersite.com/image.jpg",
    "type": "badge type",
    "archived": false,
    "system": {
        "id": 1,
        "slug": "system-slug",
        "url": "http://systemsite.com",
        "name": "System Name",
        "description": "System description.",
        "email": "admin@systemsite.com",
        "imageUrl": "http://systemsite.com/image.jpg",
        "issuers": [ ]
    },
    "issuer": {
        "id": 1,
        "slug": "issuer-slug",
        "url": "http://issuersite.com",
        "name": "Issuer Name",
        "description": "Issuer description",
        "email": "admin@issuersite.com",
        "imageUrl": "http://issuersite.com/image.jpg",
        "programs": [ ]
    },
    "program": {
        "id": 1,
        "slug": "program-slug",
        "url": "http://programsite.com",
        "name": "Program Name",
        "description": "Program description.",
        "email": "admin@programsite.com",
        "imageUrl": "http://programsite.com/image.jpg"
    },
    "criteriaUrl": "http://badgeissuersite.com/criteria",
    "criteria": [
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        }
    ],
    "alignments": [ ],
    "evidenceType": "image",
    "categories": [ ],
    "tags": [ ],
    "milestones": [ ]
}
```

#### Response structure

* id
* slug
* name
* strapline
* earnerDescription
* consumerDescription
* issuerUrl
* rubricUrl
* timeValue
* timeUnits
* limit
* unique
* created
* imageUrl
* type
* archived
* [system](systems.md)
* [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
* [program](programs.md) (_only returned where badge belongs to a program_)
* criteriaUrl
* criteria `[ ]`
  * id
  * description
  * required
  * note
* alignments `[ ]`
* evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
* categories `[ ]`
* tags `[ ]`
* milestones `[ ]`

### Potential errors

System, issuer, program or badge not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Badge]
```

## `updateBadge`: `Badge`

Update the data for an existing badge.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`| 
| | |badge|`earnerDescription`|
| | | |`strapline`|
| | | |`consumerDescription`|
| | | |`issuerUrl`|
| | | |`criteriaUrl`|
| | | |`rubricUrl`|
| | | |`unique`|
| | | |`timeValue`|
| | | |`type`|
| | | |`timeUnits`|
| | | |`image`|
| | | |`evidenceType`|
| | | |`limit`|
| | | |`archived`|
| | | |`criteria` `[ ]` (`description`, `required`, `note`)|
| | | |`categories` `[ ]`|
| | | |`tags` `[ ]`|

### Returns

The updated `badge`.

### Example method call

```js
var editedBadge = 
		{
			"slug": "badge-slug",
			"strapline": "This is the new strapline.",
			//...
		};
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: editedBadge
	};
client.updateBadge(context, function (err, updatedBadge) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "badge-slug",
    "name": "Badge Name",
    "strapline": "Updated badge strapline.",
    "earnerDescription": "Description for earners.",
    "consumerDescription": "Description for consumers.",
    "issuerUrl": "http://badgeissuersite.com",
    "rubricUrl": "http://badgeissuersite.com/rubric",
    "timeValue": 0,
    "timeUnits": "minutes",
    "limit": 0,
    "unique": 0,
    "created": "2014-06-11T15:36:49.000Z",
    "imageUrl": "http://badgeissuersite.com/image.jpg",
    "type": "badge type",
    "archived": false,
    "system": {
        "id": 1,
        "slug": "system-slug",
        "url": "http://systemsite.com",
        "name": "System Name",
        "description": "System description.",
        "email": "admin@systemsite.com",
        "imageUrl": "http://systemsite.com/image.jpg",
        "issuers": [ ]
    },
    "issuer": {
        "id": 1,
        "slug": "issuer-slug",
        "url": "http://issuersite.com",
        "name": "Issuer Name",
        "description": "Issuer description",
        "email": "admin@issuersite.com",
        "imageUrl": "http://issuersite.com/image.jpg",
        "programs": [ ]
    },
    "program": {
        "id": 1,
        "slug": "program-slug",
        "url": "http://programsite.com",
        "name": "Program Name",
        "description": "Program description.",
        "email": "admin@programsite.com",
        "imageUrl": "http://programsite.com/image.jpg"
    },
    "criteriaUrl": "http://badgeissuersite.com/criteria",
    "criteria": [
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        }
    ],
    "alignments": [ ],
    "evidenceType": "image",
    "categories": [ ],
    "tags": [ ],
    "milestones": [ ]
}
```

#### Response structure

* id
* slug
* name
* strapline
* earnerDescription
* consumerDescription
* issuerUrl
* rubricUrl
* timeValue
* timeUnits
* limit
* unique
* created
* imageUrl
* type
* archived
* [system](systems.md)
* [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
* [program](programs.md) (_only returned where badge belongs to a program_)
* criteriaUrl
* criteria `[ ]`
  * id
  * description
  * required
  * note
* alignments `[ ]`
* evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
* categories `[ ]`
* tags `[ ]`
* milestones `[ ]`

### Potential errors

System, issuer, program or badge not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]
```

Badge data invalid.

```
[ValidationError: Could not validate required fields]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Badge]
```

## `getBadgeFromCode`: `Badge`
 
Retrieve a badge using a claim code (claim codes are associated with specific badges).

### Context 

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
| | |program|`slug`|

### Parameter

This method also requires the query claim code as a second parameter.

### Returns

The requested badge.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug'
	};
client.getBadgeFromCode(context, 'query-claim-code', function (err, requestedBadge) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "badge-slug",
    "name": "Badge Name",
    "strapline": "Updated badge strapline.",
    "earnerDescription": "Description for earners.",
    "consumerDescription": "Description for consumers.",
    "issuerUrl": "http://badgeissuersite.com",
    "rubricUrl": "http://badgeissuersite.com/rubric",
    "timeValue": 0,
    "timeUnits": "minutes",
    "limit": 0,
    "unique": 0,
    "created": "2014-06-11T15:36:49.000Z",
    "imageUrl": "http://badgeissuersite.com/image.jpg",
    "type": "badge type",
    "archived": false,
    "system": {
        "id": 1,
        "slug": "system-slug",
        "url": "http://systemsite.com",
        "name": "System Name",
        "description": "System description.",
        "email": "admin@systemsite.com",
        "imageUrl": "http://systemsite.com/image.jpg",
        "issuers": [ ]
    },
    "issuer": {
        "id": 1,
        "slug": "issuer-slug",
        "url": "http://issuersite.com",
        "name": "Issuer Name",
        "description": "Issuer description",
        "email": "admin@issuersite.com",
        "imageUrl": "http://issuersite.com/image.jpg",
        "programs": [ ]
    },
    "program": {
        "id": 1,
        "slug": "program-slug",
        "url": "http://programsite.com",
        "name": "Program Name",
        "description": "Program description.",
        "email": "admin@programsite.com",
        "imageUrl": "http://programsite.com/image.jpg"
    },
    "criteriaUrl": "http://badgeissuersite.com/criteria",
    "criteria": [
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        }
    ],
    "alignments": [ ],
    "evidenceType": "image",
    "categories": [ ],
    "tags": [ ],
    "milestones": [ ]
}
```

#### Response structure

* id
* slug
* name
* strapline
* earnerDescription
* consumerDescription
* issuerUrl
* rubricUrl
* timeValue
* timeUnits
* limit
* unique
* created
* imageUrl
* type
* archived
* [system](systems.md)
* [issuer](issuers.md) (_only returned where badge belongs to an issuer_)
* [program](programs.md) (_only returned where badge belongs to a program_)
* criteriaUrl
* criteria `[ ]`
  * id
  * description
  * required
  * note
* alignments `[ ]`
* evidence type (_`URL` | `Text` | `Photo` | `Video` | `Sound`_)
* categories `[ ]`
* tags `[ ]`
* milestones `[ ]`

### Potential errors

System, issuer, program or code not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find the requested claim code `attempted-code`]
```

Missing system.

```
[ContextError: Missing system]
```
