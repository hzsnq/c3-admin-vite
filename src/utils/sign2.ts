import MD5 from "crypto-js/md5"

const key =
  "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEDvYlLMLP+jEoAHwTFQinkPgPu0x4H8hPVlKnwCzVTHgNksNwozEmQmXRwBsR9nFPWNzol/16wefaLcVDywosxlxpFyv3/2p9Z0ruD/1lQlJlWGYwv2Najez4VcO8xvSvAWHTaUgVcfPXMOusJlkW6w9KgE/yXanCWsRCE3MtmhAr9PZ+br5ucblfBVhKKCTmnkqc7/Y07hYqfTGMihMfT/BfVhwyxYLvgiqVouX94GivIXO04QF4M2UJunYumCYehYiYZURpunzml1xatVhS9uq98uRf9Rb4I2Z+p+gowvdqDZ6o0umbb2dZgOvC/Wvdr7o2Y9wox4Qtu+08PHb9AgMBAAECggEAT5NjBKOuTovV9856jaQz5w9IH9p9pyP/QXRgCAZQLCLld1ziRo12HXlFqmS2mAvW4cXHpABMuc6KNFvvfRyj/JhmWaE2D2pz5oJOP2HuD3Njzg6bK54CzXZdgE4PLEf0eDOvaQeKYmnl9qm8fhryfgLaKfr6d/zcMi51Cfyq+w6fLlqDEuA5fKdbAIh1kYCAcS2H9mm0cME0YkcLZCJsOFuNWaHIJeoxoPAkvHOPbkR+ieFu2SyqA75f7TdyXx7fIrDoYw0lS2FU7Adq0ThLSQRun7R50bJxM03vH3oQnVeYV0XDdHB7NQAjlxDrr9eHzmUbrsVbOVu4HzzQjR7rYQKBgQDjyWyHavHaxfgBkaXrd65FfMqGciwMW3J4ZGSh4cxV6q8hF+kiYBoiP5vZk8mAg8ZAXyNjvwzt32PPvDden11mkXRVY80jTjGBsH6vVSGNQ2YmmjrhS7n05lQnBuF5IQbwV3LmJJ/1CligjDOnDZypmBmo1wS9F3wp8fqf+MEkCwKBgQDcV4G4yHcmXRd6mCM8OJYv7m2CYKTbqMTw0LAa1rmT/ONGuLCil+bR/Wn+90xiw78Hc8tROYxJ8x6KzBf/3A5XIlrt38W0nr5VjIRmQnLMDJDFBgv/BBk6f3SHBNBdZ5aN+XIyTBxSrQFKPFvLIUpbgb89JNjnfclzsIFStiDuFwKBgQCNCzfMUggXsuVx80GNn7mlBTRSM3fa3vTuXxuAsVPZD0wJbcjJpEAKXOCfxMbMcMvdKAu9w5q538zp4F1Ylc07qW0jQnzPE6fL6gFHh6sS0Vz7Ihy7TCyE2+nXkIckfbLSNxPKNXtmO1XNc4K4OdF7odahmSIyA8y6HD9XtqvBKQKBgQC7pvLdciy3SXTjfYoUkYSm0YIGFVSRlkwTY0d3tANcW3UcF9KmxoNXt2B8OhSd0GNyb1VqmX42xIzwXBzcVIcKAkI6b+cqij9DEGb5yAGIcfMhOKMizlTGEyIkkx75TW1VAGoXF+bPKnP8yybJ+lIfWIKMCkOH8wKMOngI/v9QhQKBgFROY3lTE+KwcxHCHh+4pgWZVJjIvxhhR5JLptzDcmff4E/Brmp0QHcuDGq2DOuGk1uuVsHWiAeAkL1UzA2H2kpknUlTkp0uQ/wFaXDqrKo7VSkZZVOuwxPnhgUK11cOjYK6yXax/KyqEMKYEM2U6n5wwmuMw+yWmkCpRPLtsMcF"
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
    if (data[arr[i]] != "" && data[arr[i]] != null && data[arr[i]] != undefined) {
      str += arr[i] + "=" + data[arr[i]] + "&"
    }
  }
  str = str.substr(0, str.length - 1)
  return str
}
/**
 *加签方法
 **/
export const sign = (bodyParam, signType) => {
  bodyParam = sortJson(bodyParam)
  let md5Value = ""
  let str = ""
  if (signType == "MD5") {
    str = bodyParam + "&key=" + key
    md5Value = MD5(str).toString()
  } else if (signType == "RSA2") {
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
