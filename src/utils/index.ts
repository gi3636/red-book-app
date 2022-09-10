import moment from 'moment'

export function firstLetterInCapital(str) {
  return str.replace(str[0], str[0].toUpperCase())
}

export function convertTime(time) {
  return moment(+time).format('YYYY-MM-DD')
}
