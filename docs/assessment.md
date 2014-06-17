# Assessment 

BadgeKit facilitates badge issuing via an assessment process. Issuer sites can accept earner applications for published badges, forwarding the application data to the API. Applications can then be reviewed and the reviews submitted. Each application should be accompanied by evidence suited to the badge criteria - this is what an assessor will review when making awarding decisions.

_Note that when you create a new application, it should typically include evidence._

The [`Client`](methods.md) object provides the following methods:

* [`getApplications`](#getapplications-application)
* [`getApplication`](#getapplication-application)
* [`addApplication`](#addapplication-application)
* [`updateApplication`](#updateapplication-application)
* [`addReview`](#addreview-review)
* [`deleteReview`](#deletereview-review)

## `getApplications`: `[Application]`

Retrieve existing applications within a system, issuer, program and/or badge context.

* *Context*
 * __required__: system `slug`
 * __optional__: issuer `slug`, program `slug`, badge `slug`
* *Returns* - array of existing applications

### Example method call

```js
client.getApplications({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug'}, function (err, requestedApplications) {
 //...
  
});
```

### Expected response

```json
[
 {
    "id": 1,
    "slug": "application-slug",
    "learner": "earner@example.org",
    "created": "2014-06-17T18:34:28.000Z",
    "assignedTo": "reviewer@example.org",
    "assignedExpiration": "2014-07-06T11:24:45.000Z",
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
        "type": "skill",
        "archived": false,
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [ 
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        },
        ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    "processed": null,
    "evidence": [
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "image",
            "reflection": "I did this stuff"
        },
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "link",
            "reflection": "I did that stuff"
        },
        ...
    ]
 },
 ...
]
```

#### Response structure

* `[ ]`
 * id
 * slug
 * learner
 * created
 * assignedTo
 * assignedExpiration
 * [badge](badges.md)
 * processed
 * evidence `[ ]`
    * url
    * mediaType
    * reflection

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

## `getApplication`: `Application`

Retrieve a specific application for a badge.

* *Context* 
 * __required__: system `slug`, badge `slug`, application `slug`
 * __optional__: issuer `slug`, program `slug`
* *Returns* - the requested `application`

### Example method call

```js
client.getApplication({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug', application: 'application-slug'}, function (err, requestedApplication) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "application-slug",
    "learner": "earner@example.org",
    "created": "2014-06-17T18:34:28.000Z",
    "assignedTo": "reviewer@example.org",
    "assignedExpiration": "2014-07-06T11:24:45.000Z",
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
        "type": "skill",
        "archived": false,
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [ 
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        },
        ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    "processed": null,
    "evidence": [
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "image",
            "reflection": "I did this stuff"
        },
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "link",
            "reflection": "I did that stuff"
        },
        ...
    ]
}
```

#### Response structure

* id
* slug
* learner
* created
* assignedTo
* assignedExpiration
* [badge](badges.md)
* processed
* evidence `[ ]`
 * url
 * mediaType
 * reflection

### Potential errors

System, issuer, program, badge or application not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find application field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Application]

[ContextError: Application requires Badge parent context]
```

## `addApplication`: `Application`

Add a new application for a badge.

* *Context* - requires system `slug`, badge `slug` and `application`:
 * __required__: `learner` email
 * __optional__: issuer `slug`, program `slug`, application `evidence` array (each item can include `mediaType`, `url`, `reflection` - can be `image` or `link`), `assignedTo` reviewer email, `assignedExpiration` date
* *Returns* - the created `application`

### Example method call

```js
var newApplication = 
		{ 
			learner: 'earner@example.org',
			evidence: [
				{
				'reflection': 'I did this stuff.',
				'mediaType': 'image',
				'url': 'http://example.org/evidence.html'
				},
				{
				'reflection': 'I did that stuff.',
				'mediaType': 'link',
				'url': 'http://example.org/evidence.html'
				}//,...
			],
			'assignedTo': 'reviewer@example.org',
			'assignedExpiration': '2014-07-06T12:24:45.000Z'
		};		
client.addApplication({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug', application: newApplication}, function (err, createdApplication) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "application-slug",
    "learner": "earner@example.org",
    "created": "2014-06-17T18:34:28.000Z",
    "assignedTo": "reviewer@example.org",
    "assignedExpiration": "2014-07-06T11:24:45.000Z",
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
        "type": "skill",
        "archived": false,
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [ 
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        },
        ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    "processed": null,
    "evidence": [
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "image",
            "reflection": "I did this stuff"
        },
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "link",
            "reflection": "I did that stuff"
        },
        ...
    ]
}
```

#### Response structure

* id
* slug
* learner
* created
* assignedTo
* assignedExpiration
* [badge](badges.md)
* processed
* evidence `[ ]`
 * url
 * mediaType
 * reflection

### Potential errors

Application data invalid.

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
[ContextError: Context not of required type: Application]

[ContextError: Application requires Badge parent context]
```

## `updateApplication`: `Application`

Update the data for an existing application.

* *Context* 
 * __required__: system `slug`, badge `slug`, application `slug`
 * __optional__: issuer `slug`, program `slug`, any application fields you are updating - `processed` timestamp, `evidence` array (each item can include `mediaType`, `url`, `reflection` - can be `image` or `link`), `assignedTo` reviewer email, `assignedExpiration` date
* *Returns* - the updated `application`

### Example method call

```js
var proc = new Date();
var editedApplication = 
		{
			slug: 'application-slug',
			processed: proc,
			learner: 'earner@example.org',
			evidence: [
				{
				'reflection': 'I did this stuff.',
				'mediaType': 'image',
				'url': 'http://example.org/evidence.html'
				},
				{
				'reflection': 'I did that stuff.',
				'mediaType': 'link',
				'url': 'http://example.org/evidence.html'
				}//,...
			],
			'assignedTo': 'reviewer@example.org',
			'assignedExpiration': '2014-07-06T12:24:45.000Z'
		};
client.updateApplication({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug', application: editedApplication}, function (err, updatedApplication) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "application-slug",
    "learner": "earner@example.org",
    "created": "2014-06-17T18:34:28.000Z",
    "assignedTo": "reviewer@example.org",
    "assignedExpiration": "2014-07-06T11:24:45.000Z",
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
        "type": "skill",
        "archived": false,
        "criteriaUrl": "http://badgeissuersite.com/criteria",
        "criteria": [ 
        {
            "id": 1,
            "description": "Criteria description.",
            "required": 1,
            "note": "Note for reviewer."
        },
        ...
        ],
        "alignments": [ ],
        "evidenceType": "image",
        "categories": [ ],
        "tags": [ ],
        "milestones": [ ]
    },
    "processed": null,
    "evidence": [
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "image",
            "reflection": "I did this stuff"
        },
        {
            "url": "http://example.org/evidence.html",
            "mediaType": "link",
            "reflection": "I did that stuff"
        },
        ...
    ]
}
```

#### Response structure

* id
* slug
* learner
* created
* assignedTo
* assignedExpiration
* [badge](badges.md)
* processed
* evidence `[ ]`
 * url
 * mediaType
 * reflection

### Potential errors

System, issuer, program, badge or application not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find application field: `slug`, value: `attempted-slug`]
```

Application data invalid.

```
[ValidationError: Could not validate required fields]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Application]

[ContextError: Application requires Badge parent context]
```

## `addReview`: `Review`

Add a review for a badge application.

* *Context* 
 * __required__: system `slug`, badge `slug`, application `slug`
 * __optional__: issuer `slug`, program `slug`, `review` - `author` (email address of reviewer), `comment` (feedback for applicant), `reviewItems` array (each item includes `criterionId`, `satisfied`, `comment`)
* *Returns* - the created `review`

_Reviews can include a generic comment and a comment for each criterion item in the badge, together with an indicator of whether the criteria was met by the earner application._

### Example method call

```js
var newReview = 
	{
		author: 'reviewer@example.org',
		comment: 'great job',
		reviewItems: [
		{
			criterionId: 1,
			satisfied: 1,
			comment: 'perfect'
		},
		//...
		]
	};		
client.addReview({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug', application: 'application-slug', review: newReview}, function (err, createdReview) {
 //...
  
});
```

### Expected response

```json
{
    "id": 1,
    "slug": "review-slug",
    "author": "reviewer@example.org",
    "comment": "great job",
    "reviewItems": [
        {
            "criterionId": 1,
            "satisfied": 1,
            "comment": "perfect"
        },
        ...
    ]
}
```

#### Response structure

* id
* slug
* author
* comment
* reviewItems `[ ]`
 * criterionId
 * satisfied
 * comment

### Potential errors

Review data invalid.

```
[ValidationError: Could not validate required fields]
```

System, issuer, program, badge or application not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find application field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Review]

[ContextError: Review requires Application parent context]

[ContextError: Application requires Badge parent context]
```

## `deleteReview`: `Review`

Delete an existing application review.

* *Context* 
 * __required__: system `slug`, badge `slug`, application `slug`, review `slug`
 * __optional__: issuer `slug`, program `slug`

### Example method call

```js
client.deleteReview({system: 'system-slug', issuer: 'issuer-slug', program: 'program-slug', badge: 'badge-slug', application: 'application-slug', review: 'review-slug'}, function (err, returnedData) {
 //...
  
});
```

### Potential errors

System, issuer, program, badge, application or review not found.

```
[ResourceNotFoundError: Could not find system field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find issuer field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find program field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find badge field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find application field: `slug`, value: `attempted-slug`]

[ResourceNotFoundError: Could not find review field: `slug`, value: `attempted-slug`]
```

Missing system.

```
[ContextError: Missing system]
```

Incorrect context.

```
[ContextError: Context not of required type: Review]

[ContextError: Review requires Application parent context]

[ContextError: Application requires Badge parent context]
```
