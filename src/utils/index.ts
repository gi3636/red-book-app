import moment from 'moment'

export function firstLetterInCapital(str) {
  return str.replace(str[0], str[0].toUpperCase())
}

export function convertTime(time, format = 'YYYY-MM-DD') {
  return moment(+time).format(format)
}

export function throttle(fn, delay) {
  let timer
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
      timer = null // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}

//数组去重
export function unique(arr: Array<any>, key: string) {
  let newArr = []
  let obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i][key]]) {
      // @ts-ignore
      newArr.push(arr[i])
      obj[arr[i][key]] = true
    }
  }
  return newArr
}

export function jointString(arr: Array<String>) {
  let str = ''
  arr.map((item) => {
    str += item + ','
  })
  str = str.substring(0, str.length - 1)
  return str
}
