'use strict'

const hmh = require('../index')

console.assert(hmh.sum('10h 2h 5m 10m').toString() === '12h 15m')
console.assert(hmh.sum('10h 2h 5m 10m') + '' === '12h 15m')
console.assert(hmh.sum('10h 2h 5m 10m').h === 12)
console.assert(hmh.sum('10h 2h 5m 10m').m === 15)

console.assert(hmh.sum('60m').toString() === '1h')
console.assert(hmh.sum('30m 30m').toString() === '1h')
console.assert(hmh.sum('30m 30m') + '' === '1h')
console.assert(hmh.sum('30m 30m').h === 1)
console.assert(hmh.sum('30m 30m').m === null)

console.assert(hmh.sum('10m 20m').toString() === '30m')
console.assert(hmh.sum('10m 20m') + '' === '30m')
console.assert(hmh.sum('10m 20m').h === null)
console.assert(hmh.sum('10m 20m').m === 30)

console.assert(hmh.sum('61m').toString() === '1h 1m')
console.assert(hmh.sum(['10m', '10m', '45m']).toString() === '1h 5m')
console.assert(hmh.sum('10m 20m 30m 40m', 'minutes').toString() === '100m')
console.assert(hmh.sum('10h2m2h    5m').toString() === '12h 7m')
console.assert(hmh.sum(['10h ', '   20m', '1h', ' 42m ']).toString() === '12h 2m')

console.assert(hmh.sub('2h 10m').toString() === '1h 50m')
console.assert(hmh.sub('2h 10m') + '' === '1h 50m')
console.assert(hmh.sub('2h 10m').h === 1)
console.assert(hmh.sub('2h 10m').m === 50)

console.assert(hmh.sub('2h 1h 15m').toString() === '45m')
console.assert(hmh.sub('2h 1h 15m') + '' === '45m')
console.assert(hmh.sub('2h 1h 15m').h === null)
console.assert(hmh.sub('2h 1h 15m').m === 45)

console.assert(hmh.sub('3h 10m').toString() === '2h 50m')
console.assert(hmh.sub('3h 10m 1h').toString() === '1h 50m')
console.assert(hmh.sub('3h 10m', 'minutes').toString() === '170m')
console.assert(hmh.sub('1h 10m 5m').toString() === '45m')

console.assert(hmh.sub('1h 2h 3h').toString() === '-4h')
console.assert(hmh.sub('1h 2h 3h') + '' === '-4h')
console.assert(hmh.sub('1h 2h 3h').h === 4)
console.assert(hmh.sub('1h 2h 3h').isNegative === true)
console.assert(hmh.sub('1h 2h 3h').m === null)
console.assert(hmh.sub([hmh.sum('1h10m', 'minutes').toString(), '10m']).toString() === '1h')

console.assert(hmh.diff('10h 30m', '12h').toString() === '1h 30m')
console.assert(hmh.diff('10h 30m', '12h') + '' === '1h 30m')
console.assert(hmh.diff('10h 30m', '12h').h === 1)
console.assert(hmh.diff('10h 30m', '12h').m === 30)

console.assert(hmh.diff('10h 30m', '12h', 'minutes').toString() === '90m')

console.assert(hmh.div('3h', 3).toString() === '1h')
console.assert(hmh.div('3h', 3) + '' === '1h')
console.assert(hmh.div('3h', 3).h === 1)
console.assert(hmh.div('3h', 3).m === null)

console.assert(hmh.div('10h', 5).toString() === '2h')
console.assert(hmh.div('7h', 4).toString() === '1h 45m')
console.assert(hmh.div('7h', 4, 'minutes').toString() === '105m')

console.log('All tests passed!')
