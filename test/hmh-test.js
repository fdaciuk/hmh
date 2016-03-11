'use strict'

const hmh = require('../index')

console.assert(hmh.sum('10h 2h 5m 10m') === '12h 15m')
console.assert(hmh.sum('60m') === '1h')
console.assert(hmh.sum('30m 30m') === '1h')
console.assert(hmh.sum('10m 20m') === '30m')
console.assert(hmh.sum('61m') === '1h 1m')
console.assert(hmh.sum(['10m', '10m', '45m']) === '1h 5m')
console.assert(hmh.sum('10m 20m 30m 40m', 'minutes') === '100m')
console.assert(hmh.sum('10h2m2h    5m') === '12h 7m')
console.assert(hmh.sum(['10h ', '   20m', '1h', ' 42m ']) === '12h 2m')

console.assert(hmh.sub('2h 10m') === '1h 50m')
console.assert(hmh.sub('2h 1h 15m') === '45m')
console.assert(hmh.sub('3h 10m') === '2h 50m')
console.assert(hmh.sub('3h 10m 1h') === '1h 50m')
console.assert(hmh.sub('3h 10m', 'minutes') === '170m')

console.assert(hmh.diff('10h 30m', '12h') === '1h 30m')
console.assert(hmh.diff('10h 30m', '12h', 'minutes') === '90m')

console.log('All tests passed!')
