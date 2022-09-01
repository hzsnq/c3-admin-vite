import { request } from "@/utils/serviceNew"

/** 网络请求 新 */
export function toNetworkNew(data: object, baseURL: string, method: string) {
  return request({
    baseURL: baseURL,
    data: {
      method: method,
      data: JSON.stringify(data)
    }
  })
}
