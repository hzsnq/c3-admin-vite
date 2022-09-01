import store from "@/store"
import { defineStore } from "pinia"

interface INetWorkState {
  networkList: Array<any>
  isSet: Boolean
}

export const useNetworkStore = defineStore({
  id: "network",
  state: (): INetWorkState => {
    return {
      networkList: [],
      isSet: false
    }
  },
  actions: {
    /** 设置请求数组 */
    setNetworkList(item: object) {
      this.networkList = [...this.networkList, item]
    },
    RemoveNetworkList(index: number) {
      this.networkList.splice(index, 1)
    },
    setShowItem(i: Boolean) {
      this.isSet = i
    }
  },
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [{ storage: localStorage, paths: ["networkList"] }]
  }
})

/** 在 setup 外使用 */
export function useNetworkStoreHook() {
  return useNetworkStore(store)
}
