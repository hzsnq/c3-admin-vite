import { request } from "@/utils/service"

/** 网络请求 老 */
export function toNetwork(data: object, baseURL: string, method: string) {
  return request({
    baseURL: baseURL,
    data: {
      method: method,
      biz_params: JSON.stringify(data)
    }
  })
}
