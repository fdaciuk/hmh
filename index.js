'use strict'

const minutesToHours = (minutes) => {
  return parseInt(minutes / 60, 10)
}

const restMinutesToHours = (minutes) => {
  return minutes % 60
}

const hoursToMinutes = (hours) => {
  return hours * 60
}

const sumValues = (values) => {
  if (!values) return 0
  return values.reduce((acc, value) => (
    acc + value
  ))
}

const subValues = (values) => {
  if (!values) return 0
  return values.reduce((acc, value) => (
    acc - value
  ))
}

const toString = (value) => (
  Array.isArray(value) ? value.join('') : value
)

const toArray = (value) => (
  value.replace(/\s+/g, '').split(/(\d+[hm])/).filter((item) => item)
)

const getObject = (value) => {
  const stringValue = toString(value)
  const arrayValue = toArray(stringValue)
  return arrayValue.reduce((acc, val) => {
    const number = Number(val.replace(/\D/, ''))
    const unit = val[val.length - 1]
    acc[unit] = acc[unit] || []
    acc[unit].push(number)
    return acc
  }, {})
}

const showResult = (allMinutesInHours, restOfMinutes, isNegative) => {
  const showHours = (allMinutesInHours && `${allMinutesInHours}h`) || ''
  const showMinutes = (restOfMinutes && `${restOfMinutes}m`) || ''
  const negativeSymbol = isNegative ? '-' : ''
  if (showHours && showMinutes) {
    return `${negativeSymbol}${showHours} ${showMinutes}`
  }
  return `${negativeSymbol}${(showHours || showMinutes)}`
}

const getResult = (allMinutes, output) => {
  const isNegative = allMinutes < 0
  const absoluteAllMinutes = Math.abs(allMinutes)
  if (output === 'minutes') {
    return showResult(null, absoluteAllMinutes, isNegative)
  }
  let allMinutesInHours = 0
  let restOfMinutes = absoluteAllMinutes
  if (absoluteAllMinutes >= 60) {
    allMinutesInHours = minutesToHours(absoluteAllMinutes)
    restOfMinutes = restMinutesToHours(absoluteAllMinutes)
  }
  return showResult(allMinutesInHours, restOfMinutes, isNegative)
}

const getAllMinutesAdded = (value) => {
  const obj = getObject(value)
  const hours = sumValues(obj.h)
  const minutes = sumValues(obj.m)
  const allMinutes = hoursToMinutes(hours) + minutes
  return allMinutes
}

const getAllMinutesSubtracted = (value) => {
  const obj = getObject(value)
  const hours = subValues(obj.h)
  const minutes = sumValues(obj.m)
  const allMinutes = hoursToMinutes(hours) - minutes
  return allMinutes
}

const hmh = {}

hmh.sum = (value, output) => {
  const allMinutes = getAllMinutesAdded(value)
  return getResult(allMinutes, output)
}

hmh.sub = (value, output) => {
  const allMinutes = getAllMinutesSubtracted(value)
  return getResult(allMinutes, output)
}

hmh.diff = (firstHour, secondHour, output) => {
  const firstAllMinutes = getAllMinutesAdded(firstHour)
  const secondAllMinutes = getAllMinutesAdded(secondHour)
  const allMinutes = secondAllMinutes - firstAllMinutes
  return getResult(allMinutes, output)
}

hmh.div = (value, divisor, output) => {
  const allMinutes = getAllMinutesAdded(value)
  const division = allMinutes / divisor
  return getResult(division, output)
}

module.exports = hmh
