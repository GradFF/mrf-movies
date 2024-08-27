const addZeroToDate = n => (n < 10 ? `0${n}` : `${n}`)

export const newDateAdjusted = dateField => {
  let [year, month, day] = dateField.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export const getCurrentDate = () => new Date().toISOString().split('T')[0]

export const formatDateTime = date => {
  if (date) {
    let [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }
  return date
}
