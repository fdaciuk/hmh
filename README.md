# hmh - How many hours?

> Calculate hours

[![Build Status][travis-image]][travis-url]

## Installation

```js
npm install hmh
```

## Usage

**Sum hours:**

Pass a string or an array:

```js
const hmh = require('hmh')

const sum = hmh.sum('10m 20m 30m 40m 50m')
console.log(sum) // '2h 30m'
```

or

```js
const hmh = require('hmh')

const sum = hmh.sum(['10m', '20m', '30m', '40m', '50m'])
console.log(sum) // '2h 30m'
```

If you want the output in minutes, you may pass it as a second parameter:

```js
const sum = hmh.sum('10m 20m 30m 40m', 'minutes')
console.log(sum) // '100m'
```

**Subtract hours:**

```js
const sub = hmh.sub('1h 20m')
console.log(sub) // '40m'
```

```js
const sub = hmh.sub('3h 10m 1h')
console.log(sub) // 1h 50m
```

**Difference between two hours:**

```js
const diff = hmh.diff('10h 35m', '12h 10m')
console.log(diff) // '1h 15m'
```

Or the output in minutes:

```js
const diff = hmh.diff('10h 35m', '12h 10m', 'minutes')
console.log(diff) // '75m'
```

## Related

[hmh-cli][hmh-cli-url]

## License

[MIT][license-url] &copy; Fernando Daciuk

[travis-image]: https://travis-ci.org/fdaciuk/hmh.svg?branch=master
[travis-url]: https://travis-ci.org/fdaciuk/hmh
[hmh-cli-url]: https://github.com/fdaciuk/hmh-cli
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
