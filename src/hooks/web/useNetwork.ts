import { reactive, watch } from "vue"
import { useNetworkStoreHook } from "@/store/modules/network"

interface NetworkItem {
  /** 请求数据 */
  requestData: string
  /** 请求地址 */
  requestUrl: string
  /** method */
  method: string
  /** 响应数据 */
  responseData: boolean
  /** 存储时间 */
  date: string
  /** true老网关 false新网关 */
  isGateway: boolean
}

// 暴露hook函数
export function useNetwork() {
  const networkStoreHook = useNetworkStoreHook()

  const tableState = reactive({
    tableData: networkStoreHook.networkList,
    isSet: networkStoreHook.isSet
  })

  watch(
    () => networkStoreHook.networkList,
    (newVal) => {
      tableState.tableData = newVal
    },
    { deep: true, immediate: true }
  )

  watch(
    () => networkStoreHook.isSet,
    (newVal) => {
      tableState.isSet = newVal
    },
    { deep: true, immediate: true }
  )

  const delNetworkItem = (index) => {
    networkStoreHook.RemoveNetworkList(index)
  }

  const addNetworkItem = (item: NetworkItem) => {
    networkStoreHook.setNetworkList(item)
  }

  const showItem = (i: Boolean) => {
    networkStoreHook.setShowItem(i)
  }

  // 返回数据
  return { tableState, delNetworkItem, addNetworkItem, showItem }
}
