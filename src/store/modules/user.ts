import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken } from "@/utils/cookies"
import router, { resetRouter } from "@/router"
import { login, getUserInfo } from "@/api/login"
import { RouteRecordRaw } from "vue-router"

interface IUserState {
  token: string
  roles: string[]
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      token: getToken() || "",
      roles: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        if (userInfo.username === "admin" && userInfo.password === "gome2022c3") {
          const tokenData = "admin-token"
          setTimeout(() => {
            setToken(tokenData)
            this.token = tokenData
            resolve(true)
          }, 1000)
        } else {
          reject("账号密码错误")
        }

        // login({
        //   username: userInfo.username.trim(),
        //   password: userInfo.password
        // })
        //   .then((res: any) => {
        //     setToken(res.data.accessToken)
        //     this.token = res.data.accessToken
        //     resolve(true)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve) => {
        const data = {
          user: {
            id: 0,
            username: "admin",
            password: "any",
            name: "Super Admin",
            avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            introduction: "I am a super administrator",
            email: "admin@test.com",
            phone: "1234567890",
            roles: ["admin"]
          }
        }
        this.roles = data.user.roles
        resolve(data)
        // getUserInfo()
        //   .then((res: any) => {
        //     this.roles = res.data.user.roles
        //     resolve(res)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    /** 切换角色 */
    async changeRoles(role: string) {
      const token = role + "-token"
      this.token = token
      setToken(token)
      await this.getInfo()
      const permissionStore = usePermissionStore()
      permissionStore.setRoutes(this.roles)
      resetRouter()
      permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
    /** 登出 */
    logout() {
      removeToken()
      this.token = ""
      this.roles = []
      resetRouter()
    },
    /** 重置 Token */
    resetToken() {
      removeToken()
      this.token = ""
      this.roles = []
    }
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
