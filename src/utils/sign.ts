import MD5 from "crypto-js/md5"

const key = "MqjHZjB9MH8Jg9SYbxcB@kykJE5bF3nr"
/**
 **ASCII排序，生成加签明文
 **/
const sortJson = (data) => {
  data = data || "{}"
  const arr: Array<any> = []
  for (const key in data) {
    arr.push(key)
  }
  arr.sort()
  let str = ""
  for (const i in arr) {
    if (data[arr[i]] !== "" && data[arr[i]] != null && data[arr[i]] != undefined) {
      str += arr[i] + "=" + data[arr[i]] + "&"
    }
  }
  str = str.substr(0, str.length - 1)
  return str
}
/**
 *加签方法
 **/
export const sign = (bodyParam: object, signType: string) => {
  const bodyParams = sortJson(bodyParam)
  let md5Value = ""
  let str = ""
  if (signType === "MD5") {
    str = bodyParams + "&key=" + key
    md5Value = MD5(str).toString()
  } else if (signType === "RSA2") {
    // str = bodyParam + '&key=' + key
    // md5Value = CryptoJS_one.HmacSHA256(str, key).toString()
  } else {
    console.log("加密类型错误")
  }
  return md5Value.toUpperCase()
}

//当前时间戳
export const getNowFormatDate = () => {
  //时间戳
  const Dates = new Date()
  //年份
  const Year = Dates.getFullYear()
  //星期
  // const data: number = Dates.getDay()
  //月份下标是0-11
  const Months = Dates.getMonth() + 1 < 10 ? "0" + (Dates.getMonth() + 1) : Dates.getMonth() + 1
  //具体的天数
  const Day = Dates.getDate() < 10 ? "0" + Dates.getDate() : Dates.getDate()
  //小时
  const Hours = Dates.getHours() < 10 ? "0" + Dates.getHours() : Dates.getHours()
  //分钟
  const Minutes = Dates.getMinutes() < 10 ? "0" + Dates.getMinutes() : Dates.getMinutes()
  //秒
  const Seconds = Dates.getSeconds() < 10 ? "0" + Dates.getSeconds() : Dates.getSeconds()
  return `${Year}.${Months}.${Day} ${Hours}:${Minutes}:${Seconds}`
}
