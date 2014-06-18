# Issuing

In BadgeKit, issuing (awarding) a badge to an earner means creating a badge instance for the earner email address. Badge instances are specific instances of badges awarded to earners, rather than generic badges available for earning. Badges can be issued following various different processes - a badge being claimed with a claim code, a badge application being approved, a badge being issued directly.

The [`Client`](methods.md) object provides the following methods:

* [`getBadgeInstances`](#getbadgeinstances-instance)
* [`getBadgeInstance`](#getbadgeinstance-instance)
* [`createBadgeInstance`](#createbadgeinstance-instance)
* [`deleteBadgeInstance`](#deletebadgeinstance-instance)
* [`updateBadgeInstance`](#updatebadgeinstance-instance)

## `getBadgeInstances`: `[Instance]`

Retrieve awarded instances of particular badge.

## `getBadgeInstance`: `Instance`

Retrieve a specific instance of an awarded badge.

## `createBadgeInstance`: `Instance`

Create a badge instance - this means issuing a badge to a particular earner. Badge issuing can involve a claim code.

## `deleteBadgeInstance`: `Instance`

Delete an awarded instance of a badge.

## `updateBadgeInstance`: `Instance`

Update the data for a badge instance.
