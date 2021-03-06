# Claim Codes

BadgeKit supports a range of issuing approaches, including claim codes. When an earner completes an achievement or activity that entitles them to a badge, the issuer can provide them with a claim code for the badge. The issuer site can allow the earner to submit their claim code - if the claim code is valid the issuer site can then go ahead and issue the badge to the earner. The BadgeKit client therefore supports managing claim codes.

Claim codes can be singe use or multi-use (meaning that the same claim code can be used by more than one earner to claim a badge). Single use claim codes are accompanied by the email address of the earner once claimed.

_Each claim code exists within the context of a system/ issuer/ program and badge._

The [`Client`](methods.md) object provides the following methods:

* [`getClaimCodes`](#getclaimcodes-claimcode)
* [`getClaimCode`](#getclaimcode-claimcode)
* [`createClaimCode`](#createclaimcode-claimcode)
* [`deleteClaimCode`](#deleteclaimcode-claimcode)

<!--* [`updateClaimCode`](#updateclaimcode-claimcode)-->
<!--* [`claimClaimCode`](#claimclaimcode-claimcode)-->
<!--* [`generateRandomClaimCode`](#generaterandomclaimcode-claimcode)-->

## `getClaimCodes`: `[ClaimCode]`

Retrieve all existing claim codes for a badge.

### Context 

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|

### Returns

All claim codes for the given system/ issuer/ program/ badge.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug'
	};
client.getClaimCodes(context, function (err, requestedClaimCodes) {
 //...
  
});
```

### Expected response

```json
[
    {
        "id": 1,
        "code": "abcdefghijklm0123456789012",
        "claimed": false,
        "email": null,
        "multiuse": false,
        "badge": {
            "id": 1,
            "slug": "badge-slug",
            "name": "Badge Name",
            "strapline": "Badge description.",
            "earnerDescription": "Description for earners.",
            "consumerDescription": "Description for consumers.",
            "issuerUrl": "http://badgeissuersite.com",
            "rubricUrl": "http://badgeissuersite.com/rubric",
            "timeValue": 0,
            "timeUnits": "minutes",
            "limit": 0,
            "unique": 0,
            "created": "2014-06-11T15:36:49.000Z",
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
                "description": "Issuer description.",
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
            "criteria": [
                {
                    "id": 1,
                    "description": "Criteria description.",
                    "required": 1,
                    "note": "Note for reviewer"
                },
                ...
            ],
            "alignments": [ ],
            "evidenceType": "image",
            "categories": [ ],
            "tags": [ ],
            "milestones": [ ]
        }
    }
]
```

#### Response structure

* `[ ]`
 * id
 * code
 * claimed
 * email
 * multiuse
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

_If the specified context does not contain any claim codes, the client will return an empty array._

## `getClaimCode`: `ClaimCode`

Retrieve a specific claim code.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|claimCode|`code`| | |

### Returns

The requested claim code.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		claimCode: 'claim-code'
	};
client.getClaimCode(context, function (err, requestedClaimCode) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "code": "abcdefghijklm0123456789012",
    "claimed": false,
    "email": null,
    "multiuse": false,
    "badge": {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        "strapline": "Badge description.",
        "earnerDescription": "Description for earners.",
        "consumerDescription": "Description for consumers.",
        "issuerUrl": "http://badgeissuersite.com",
        "rubricUrl": "http://badgeissuersite.com/rubric",
        "timeValue": 0,
        "timeUnits": "minutes",
        "limit": 0,
        "unique": 0,
        "created": "2014-06-11T15:36:49.000Z",
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
            "description": "Issuer description.",
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
        "criteria": [
            {
                "id": 1,
                "description": "Criteria description.",
                "required": 1,
                "note": "Note for reviewer"
            },
            ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    }
}
```

#### Response structure

* id
* code
* claimed
* email
* multiuse
* [badge](badges.md)

### Potential errors

System, issuer, program, badge or claim code not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find claimCode field: `code`, value: `attempted-code`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: ClaimCode]

[ContextError: ClaimCode requires Badge parent context]
```

## `createClaimCode`: `ClaimCode`

Create a new claim code.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|claimCode|`code`|claimCode|`claimed`|
| | | |`multiuse`|
| | | |`email` (_of claimed earner_)|

### Returns

The created `claimCode`.

### Example method call

```js
var newClaimCode = {
		code: 'a1b2c3d4e5f6g7h8i9j0',
		claimed: true,
		email: 'earner@example.org',
		multiuse: false
	};
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		claimCode: newClaimCode
	};
client.createClaimCode(context, function (err, createdClaimCode) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "code": "a1b2c3d4e5f6g7h8i9j0",
    "claimed": true,
    "email": "earner@example.org",
    "multiuse": false,
    "badge": {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        "strapline": "Badge description.",
        "earnerDescription": "Description for earners.",
        "consumerDescription": "Description for consumers.",
        "issuerUrl": "http://badgeissuersite.com",
        "rubricUrl": "http://badgeissuersite.com/rubric",
        "timeValue": 0,
        "timeUnits": "minutes",
        "limit": 0,
        "unique": 0,
        "created": "2014-06-11T15:36:49.000Z",
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
            "description": "Issuer description.",
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
        "criteria": [
            {
                "id": 1,
                "description": "Criteria description.",
                "required": 1,
                "note": "Note for reviewer"
            },
            ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    }
}
```

#### Response structure

* id
* code
* claimed
* email
* multiuse
* [badge](badges.md)

### Potential errors

Claim code data invalid.

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

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: ClaimCode]

[ContextError: ClaimCode requires Badge parent context]
```

## `deleteClaimCode`: `ClaimCode`

Delete an existing claim code.

### Context

| |**Required**| |**Optional**|
|:---|:---|:---|:---|
|system|`slug`|issuer|`slug`|
|badge|`slug`|program|`slug`|
|claimCode|`code`| | |

### Returns

The deleted `claimCode`.

### Example method call

```js
var context = {
		system: 'system-slug', 
		issuer: 'issuer-slug', 
		program: 'program-slug', 
		badge: 'badge-slug', 
		claimCode: 'claim-cde'
	};
client.deleteClaimCode(context, function (err, deletedClaimCode) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "code": "a1b2c3d4e5f6g7h8i9j0",
    "claimed": true,
    "email": "earner@example.org",
    "multiuse": false,
    "badge": {
        "id": 1,
        "slug": "badge-slug",
        "name": "Badge Name",
        "strapline": "Badge description.",
        "earnerDescription": "Description for earners.",
        "consumerDescription": "Description for consumers.",
        "issuerUrl": "http://badgeissuersite.com",
        "rubricUrl": "http://badgeissuersite.com/rubric",
        "timeValue": 0,
        "timeUnits": "minutes",
        "limit": 0,
        "unique": 0,
        "created": "2014-06-11T15:36:49.000Z",
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
            "description": "Issuer description.",
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
        "criteria": [
            {
                "id": 1,
                "description": "Criteria description.",
                "required": 1,
                "note": "Note for reviewer"
            },
            ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    }
}
```

#### Response structure

* id
* code
* claimed
* email
* multiuse
* [badge](badges.md)

### Potential errors

System, issuer, program, badge, or claim code not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find claimCode field: `code`, value: `attempted-code`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: ClaimCode]

[ContextError: ClaimCode requires Badge parent context]
```

<!--
## `updateClaimCode`: `ClaimCode`

Update the data for an existing claim code.

* *Context*
 * __required__: system `slug`, badge `slug`, claimCode `code`
 * __optional__: issuer `slug`, program `slug`, and any claimCode fields you are updating - `claimed` boolean, `multiuse` boolean, `email` of claimed earner (if single-use)
* *Returns* - the updated `claimCode`
-->

<!--
## `claimClaimCode`: `ClaimCode`

Claim a claim code for an earner.

* *Context* 
 * __required__: system `slug`, badge `slug`, claimCode `code`, earner `email`
 * __optional__: issuer `slug`, program `slug`
* *Returns* - the claimed `claimCode`
-->

<!--## `generateRandomClaimCode`: `ClaimCode`-->
