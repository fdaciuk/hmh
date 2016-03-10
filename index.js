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

const getObject = (value) => {
  value = Array.isArray(value) ? value : value.split(' ')
  return value.reduce((acc, val) => {
    const number = Number(val.replace(/\D/, ''))
    const unit = val[val.length - 1]
    acc[unit] = acc[unit] || []
    acc[unit].push(number)
    return acc
  }, {})
}

const showResult = (allMinutesInHours, restOfMinutes) => {
  const showHours = (allMinutesInHours && `${allMinutesInHours}h`) || ''
  const showMinutes = (restOfMinutes && `${restOfMinutes}m`) || ''
  if (showHours && showMinutes) {
    return `${showHours} ${showMinutes}`
  }
  return showHours || showMinutes
}

const getResult = (allMinutes, output) => {
  if (output === 'minutes') {
    return showResult(null, allMinutes)
  }
  let allMinutesInHours = 0
  let restOfMinutes = allMinutes
  if (allMinutes >= 60) {
    allMinutesInHours = minutesToHours(allMinutes)
    restOfMinutes = restMinutesToHours(allMinutes)
  }
  return showResult(allMinutesInHours, restOfMinutes)
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
  const minutes = subValues(obj.m)
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

module.exports = hmh
