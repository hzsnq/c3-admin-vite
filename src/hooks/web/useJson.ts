import { ElMessage } from "element-plus"
import LosslessJSON from "json-bigint"

// 暴露hook函数
export function beJson() {
  const isJson = ($string, showToast) => {
    if ($string.length <= 0) {
      return
    }
    try {
      return typeof JSON.parse($string) == "object" || "string"
    } catch (e) {
      if (showToast) {
        console.log(e)
        ElMessage.error("数据格式化失败！")
      }
      return false
    }
  }

  const judgeType = (item: any) => {
    return Object.prototype.toString.call(item)
  }

  const caseType = (item: any, itemType: string) => {
    switch (itemType) {
      case "[object Array]":
        return item
      case "[object Object]":
        return item
      case "[object String]":
        return isJson(item, false) ? LosslessJSON({ storeAsString: true }).parse(item) : item
      default:
        return item
    }
  }

  // 返回数据
  return { isJson, caseType, judgeType }
}
