# hmh - How many hours?

> Calculate hours using time spaces

[![Build Status][travis-image]][travis-url]

## Installation

```console
npm install hmh
```

**Note:** To install the previous version, when all methods just return a string, use:

```console
npm install hmh@1.0.5
```

## API Documentation

### hmh.sum(value[, output])

Calculate the hours, summing time spaces.

#### value

Type: `String` or `Array`

Value is a number, representing a time space, that must have a _suffix_ `h` (hours) or `m` (minutes).
The _suffix_ needs to be stuck in the number.

> By `time space`, I mean:
>  - 1 hour and 10 minutes = `1h 10m` or `1h10m`
>  - 2 hours = `2h` or `120m`
>  - Understood? xD

You can use any time spaces you want, and don't worry about spaces, they will be ignored:

```js
const hmh = require('hmh')
console.log(hmh.sum('10m 20m 30m 40m 50m').toString()) // '2h 30m'
console.log(hmh.sum('10h2m2h    5m').toString()) // '12h 7m'
```

You may use an array too:

```js
console.log(hmh.sum(['10m', '   20m', ' 30m ', '40m', '50m']).toString()) // '2h 30m'
```

See? Spaces between time spaces are completely ignored =)


#### output

Type: `String` Default: `hours` Options: `minutes`

The output is always shown in the best format. If it don't have `hours`, just `minutes` will be shown.
Otherwise, it will be shown in hours.

But you may want to force the output in `minutes`. That's easy! Just pass it as second parameter:

```js
const sum = hmh.sum('10m 20m 30m 40m', 'minutes')
console.log(sum.toString()) // '100m'
```

#### Return

Type: `Object`

All methods return an object, with the properties `h`, `m` and `isNegative`; and the method `toString()`:

```js
console.log(hmh.sum('1h 10m 20m 30m')) // { toString: [Function], h: 2, m: null, isNegative: false }
```

##### .h

Type: `Number` or `null`

This property returns the number of **hours** in result:

```js
console.log(hmh.sum('1h 10m 20m 30m').h) // 2
```

##### .m

Type: `Number` or `null`

This property returns the number of **minutes** in result:

```js
console.log(hmh.sum('1h 10m 30m').m) // 40
console.log(hmh.sum('1h 10m 20m 30m').m) // null
console.log(hmh.sum('1h 10m 20m 30m', 'minutes').m) // 120
```

##### .isNegative

Type: `Boolean`

This property returns if the result is negative:

```js
console.log(hmh.sub('1h 2h').isNegative) // true
console.log(hmh.sub('2h 1h').isNegative) // false
```

##### .toString()

Type: `Function` Return: `String`

This method returns a String representation for the result (it is the same as the first version returned):

```js
console.log(hmh.sum('1h 2h').toString()) // '3h'
console.log(hmh.sum('1h 2h', 'minutes').toString()) // '180m'
console.log(hmh.sum('1h 2h') + '') // '3h'
```

Look the last `console.log`. By default, JavaScript uses `toString()` method when the `+` operator is used with strings =)

### hmh.sub(value[, output])

Calculate the hours, subtracting time spaces.

`value` and `output` options are the same than `hmh.sum()` method. The difference is this method subtracts time spaces:

```js
console.log(hmh.sub('1h 20m').toString()) // '40m'
console.log(hmh.sub('3h 10m 1h').toString()) // '1h 50m'
```

This method considers that the all time spaces should be subtracted:

```js
console.log(hmh.sub('1h10m 10m').toString()) // 40m
```

The result `40m` is becausea all time spaces are subtracted:

```console
1h - 10m - 10m = 40m
```

If you want to subtract `10m` by `1h10m`, firstly you need to convert `1h10m` in just one time space. In this case, convert `1h10m` to minutes. You can do something like:

```js
const minutes = hmh.sum('1h10m', 'minutes').toString()
console.log(hmh.sub([minutes, '10m']).toString()) // '1h'
```
Because now, `1h10m` it's just `70m`.

`70m - 10m = 60m = 1h`. Easy? =)

### hmh.diff(firstValue, secondValue[, output])

Calculate the difference between two time spaces.

Something like: _How many hours I have between 10h 15m am and 12h pm?_
The answer is pretty simple:

```js
console.log(hmh.diff('10h 15m', '12h').toString()) // '1h 45m'
```

Tada! :tada: :grin:

The `output` is the same than above methods ;)

### hmh.div(value, divisor[, output])

Divide a time space into a number, passed in `divisor` parameter.

Think: you have `7h` available to finish a job, and 4 days to use all this hours.
**How many hours** you can spent per day?

```js
console.log(hmh.div('7h', 4).toString()) // '1h 45m'
```

:dancer: :dancer:

And about `output`? The same than above ones!

## Related

[hmh-cli][hmh-cli-url]

## License

[MIT][license-url] &copy; Fernando Daciuk

[travis-image]: https://travis-ci.org/fdaciuk/hmh.svg?branch=master
[travis-url]: https://travis-ci.org/fdaciuk/hmh
[hmh-cli-url]: https://github.com/fdaciuk/hmh-cli
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
