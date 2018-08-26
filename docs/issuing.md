# Issuing

In BadgeKit, issuing (awarding) a badge to an earner means creating a badge instance for the earner email address. Badge instances are specific instances of badges awarded to earners, rather than generic badges available for earning. Badges can be issued following various different processes: a badge being claimed with a claim code; a badge application being approved; a badge being issued directly.

_Each badge instance exists within the context of a system/ issuer/ program and badge._

The [`Client`](methods.md) object provides the following methods:

* [`getBadgeInstances`](#getbadgeinstances-instance)
* [`getBadgeInstance`](#getbadgeinstance-instance)
* [`createBadgeInstance`](#createbadgeinstance-instance)
* [`createBadgeInstances`](#createbadgeinstances-instances)
* [`deleteBadgeInstance`](#deletebadgeinstance-instance)

<!--* [`updateBadgeInstance`](#updatebadgeinstance-instance)-->

## `getBadgeInstances`: `[Instance]`

Retrieve awarded instances of a particular badge.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|

### Options

This method takes an optional second parameter to specify pagination data:

* `paginate` - _JSON object_
 * `page` - _page of results to return_
 * `count` - _number of results per page_

### Returns

Array of badge instances.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug'
	};
var options = { 
	paginate: { 
		page: 1, 
		count: 2 
	}
};
client.getBadgeInstances(context, options, function (err, requestedInstances) {
 //...
  
});
```

### Expected response

```json
[
    {
        "slug": "instance-slug",
        "email": "earner@example.org",
        "expires": "2015-06-13T18:51:15.000Z",
        "issuedOn": "2014-06-13T18:51:15.000Z",
        "claimCode": "claim-code",
        "assertionUrl": "http://badgeissuersite.com/public/assertions/instance-slug",
        "badge": {
            "id": 2,
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
            "created": "2014-06-11T15:38:26.000Z",
            "imageUrl": "http://badgeissuersite.com/images/badge/1",
            "type": "skill",
            "archived": false,
            "system": {
                "id": 1,
                "slug": "system-slug",
                "url": "http://systemsite.com",
                "name": "System Name",
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
            "criteriaUrl": "http://badgeissuersite.com/badge/badge-slug/criteria",
            "criteria": [ ],
            "alignments": [ ],
            "evidenceType": null,
            "categories": [ ],
            "tags": [ ],
            "milestones": [ ]
        }
    },
    ...
]
```

#### Response structure

* `[ ]`
 * slug
 * email
 * expires
 * issuedOn
 * claimCode
 * assertionUrl
 * [badge](badges.md)

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

_If there are no instances of the requested badge, the client will return an empty array._

## `getBadgeInstance`: `Instance`

Retrieve instance of an awarded badge for a specific earner.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|instance|`email`| | |

### Returns

Requested badge instance.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		instance: 'earner@example.org'
	};
client.getBadgeInstance(context, function (err, requestedInstance) {
 //...
  
});
```

### Expected response

```json
{
    "slug": "instance-slug",
    "email": "earner@example.org",
    "expires": "2015-06-13T18:51:15.000Z",
    "issuedOn": "2014-06-13T18:51:15.000Z",
    "claimCode": "claim-code",
    "assertionUrl": "http://badgeissuersite.com/public/assertions/instance-slug",
    "badge": {
        "id": 2,
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
        "created": "2014-06-11T15:38:26.000Z",
        "imageUrl": "http://badgeissuersite.com/images/badge/1",
        "type": "skill",
        "archived": false,
        "system": {
            "id": 1,
            "slug": "system-slug",
            "url": "http://systemsite.com",
            "name": "System Name",
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
        "criteriaUrl": "http://badgeissuersite.com/badge/badge-slug/criteria",
        "criteria": [ ],
        "alignments": [ ],
        "evidenceType": null,
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    }
}
```

#### Response structure

* slug
* email
* expires
* issuedOn
* claimCode
* assertionUrl
* [badge](badges.md)

### Potential errors

System, issuer, program, badge or instance not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badgeInstance field: `email`, value: `attempted-email`]
```

Missing system or badge.

```
[ContextError: Missing system]

[ContextError: Missing badge]
```

Incorrect context.

```
[ContextError: Context not of required type: Instance]
```

## `createBadgeInstance`: `Instance`

Create a badge instance - this means issuing a badge to a particular earner. Badge issuing can involve a claim code.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|instance|`email`|instance|`claimCode`|
| | | |`slug`|
| | | |`issuedOn` (_timestamp_)|
| | | |`expires` (_timestamp_)|

### Options

This method takes an optional second parameter to specify a claim code and/or comment:

* `code` - _claim code for the new badge instance_
* `comment` - _comment to forward to the API webhook_

### Returns

The created badge instance.

### Example method call

```js
var issueDate = new Date();
var expDate = new Date();
expDate.setDate(expDate.getDate()+365);
var newBadgeInstance = {
		email: 'earner@example.org',
		slug: 'ihgfedcba',
		claimCode: 'a1b2c3d4e5',
		issuedOn: issueDate,
		expires: expDate
	};
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		instance: newBadgeInstance
	};
var options = {
		code: "claim-code",
		comment: "excellent job"
	};
client.createBadgeInstance(context, options, function (err, createdBadgeInstance) {
 //...
  
});
```

### Expected response

```json
{
    "slug": "ihgfedcba",
    "email": "earner@example.org",
    "expires": "2015-06-13T18:51:15.000Z",
    "issuedOn": "2014-06-13T18:51:15.000Z",
    "claimCode": "claim-code",
    "assertionUrl": "http://badgeissuersite.com/public/assertions/instance-slug",
    "badge": null
}
```

#### Response structure

* slug
* email
* expires
* issuedOn
* claimCode
* assertionUrl
* [badge](badges.md)

### Potential errors

Badge instance data invalid.

```
[ValidationError: Could not validate required fields]
```

System, issuer, program or badge not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]
```

Missing system or badge.

```
[ContextError: Missing system]

[ContextError: Missing badge]
```

Incorrect context.

```
[ContextError: Context not of required type: Instance]
```

## `createBadgeInstances`: `Instances`

Create multiple badge instances - this means issuing a particular badge to a group of earners.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|emails|`[ ]`| | |

### Options

This method takes an array parameter including a list of emails to issue the badge to:

* `emails` - _array of email addresses_

_The bulk issuing method does not accept the claim code parameter._

### Returns

Array of created badge instances. ___If any of the email addresses passed have already been awarded this badge, new instances will not be created for them and they will not be included in the returned data. Similarly, any duplicate email addresses in the array will only return a single new badge instance.___

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		emails: ['earner@example.org', 'other@example.org']
	};
client.createBadgeInstances(context, function (err, createdBadgeInstances) {
 //...
  
});
```

### Expected response

```json
[{
    "slug": "ihgfedcba",
    "email": "earner@example.org",
    "expires": "2015-06-13T18:51:15.000Z",
    "issuedOn": "2014-06-13T18:51:15.000Z",
    "claimCode": "claim-code",
    "assertionUrl": "http://badgeissuersite.com/public/assertions/instance-slug",
    "badge": null
},
...
]
```

#### Response structure

* `[ ]`
 * slug
 * email
 * expires
 * issuedOn
 * claimCode
 * assertionUrl
 * [badge](badges.md)

### Potential errors

Badge instance data invalid.

```
[ValidationError: Could not validate required fields]
```

System, issuer, program or badge not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]
```

Missing system or badge.

```
[ContextError: Missing system]

[ContextError: Missing badge]
```

## `deleteBadgeInstance`: `Instance`

Delete an awarded instance of a badge.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|instance|`email`| | |

### Returns

The deleted badge instance.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		instance: 'earner@example.org'
	};
client.deleteBadgeInstance(context, function (err, deletedBadge) {
 //...
  
});
```

### Expected response

```json
{
    "slug": "instance-slug",
    "email": "earner@example.org",
    "expires": "2015-06-13T18:51:15.000Z",
    "issuedOn": "2014-06-13T18:51:15.000Z",
    "claimCode": "claim-code",
    "assertionUrl": "http://badgeissuersite.com/public/assertions/instance-slug",
    "badge": {
        "id": 2,
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
        "created": "2014-06-11T15:38:26.000Z",
        "imageUrl": "http://badgeissuersite.com/images/badge/1",
        "type": "skill",
        "archived": false,
        "system": {
            "id": 1,
            "slug": "system-slug",
            "url": "http://systemsite.com",
            "name": "System Name",
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
        "criteriaUrl": "http://badgeissuersite.com/badge/badge-slug/criteria",
        "criteria": [ ],
        "alignments": [ ],
        "evidenceType": null,
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    }
}
```

#### Response structure

* slug
* email
* expires
* issuedOn
* claimCode
* assertionUrl
* [badge](badges.md)

### Potential errors

System, issuer, program, badge or instance not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badgeInstance field: `email`, value: `attempted-email`]
```

Missing system or badge.

```
[ContextError: Missing system]

[ContextError: Missing badge]
```

Incorrect context.

```
[ContextError: Context not of required type: Instance]
```

<!--
## `updateBadgeInstance`: `Instance`

Update the data for a badge instance.

* *Context* - requires system `slug`, badge `slug` and instance:
 * __required__: `email` of earner
 * __optional__: issuer `slug`, program `slug`, any instance fields you are updating - `claimCode`, `slug`, `issuedOn` timestamp, `expires` timestamp
* *Returns* - the updated badge instance

-->

