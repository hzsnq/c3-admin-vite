<script lang="ts" setup>
import { reactive, ref, watch, toRaw, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { toNetwork } from "@/api/network"
import { toNetworkNew } from "@/api/networkNew"
import { CircleClose, CirclePlusFilled } from "@element-plus/icons-vue"
import { useNetworkStoreHook } from "@/store/modules/network"
import { ElMessage, ElMessageBox } from "element-plus"
import { getNowFormatDate } from "@/utils/sign"
import { useNetwork } from "@/hooks/web/useNetwork"

interface RequestForm {
  /** 接口地址 */
  networkPath: string
  /** 请求体 */
  method: string
  /** 请求体 */
  request: string
  /** true老网关 false新网关 */
  isGateway: boolean
}

interface RequestValueForm {
  /** 键值 */
  key: string
  /** 值 */
  value: string
}

const route = useRoute()
const network = useNetwork()
const requestFormDom = ref<any>()

const requestData = reactive({
  dataAll: [{ key: "", value: "" }],
  addData: () => {
    const item = {
      key: "",
      value: ""
    } as RequestValueForm
    const length = requestData.dataAll.length
    if (requestData.dataAll[length - 1].key !== "") {
      requestData.dataAll = [...requestData.dataAll, item]
      console.log(requestData.dataAll)
    } else {
      ElMessage.error("请填写完再添加！")
    }
  },
  removeData: (index) => {
    ElMessageBox.confirm("确定要删除该项么?")
      .then(() => {
        requestData.dataAll.splice(index, 1)
      })
      .catch(() => {
        // catch error
      })
  },
  generateData: () => {
    const item = {}
    for (let i = 0; i < requestData.dataAll.length; i++) {
      item[requestData.dataAll[i].key] = requestData.dataAll[i].value
    }
    state.requestForm.request = JSON.stringify(item)
  }
})

const state = reactive({
  /** 发起请求 Loading */
  loading: false,
  /** 验证码图片 URL */
  codeUrl: "",
  /** 请求表单 */
  requestForm: {
    networkPath: "",
    request: `{"":""}`,
    method: "",
    isGateway: true
  } as RequestForm,
  requestData: "",
  /** 登录表单校验规则 */
  requestRules: {
    networkPath: [{ required: true, message: "请输入请求地址", trigger: "blur" }],
    method: [{ required: true, message: "请输入method", trigger: "blur" }],
    request: [{ required: true, message: "请输入请求体", trigger: "blur" }]
  },
  /** 发起请求 */
  handleLogin: () => {
    requestFormDom.value.validate((valid: boolean) => {
      if (valid) {
        let data: any = JSON.parse(state.requestForm.request)
        data = Object.prototype.toString.call(data) === "[object String]" ? JSON.parse(data) : data
        const reqUrl = state.requestForm.networkPath
        if (state.requestForm.isGateway) {
          oldGateway(data, reqUrl, state.requestForm.method)
        } else {
          newGateway(data, reqUrl, state.requestForm.method)
        }
      } else {
        return false
      }
    })
  },
  /** 清空请求表单 */
  resetResponse: () => {
    state.requestForm = {
      networkPath: "",
      request: "",
      method: "",
      isGateway: true
    }
    state.requestData = ""
  }
})

const oldGateway = (data, reqUrl, method) => {
  toNetwork(data, reqUrl, method).then((res: any) => {
    const { code, biz_params, sub_code } = res
    if (code === "000" && sub_code === "000000") {
      res.biz_params = JSON.parse(biz_params)
      ElMessage.success("请求成功！")
    } else {
      console.log(code, "code")
    }
    state.requestData = res
    const item = {
      requestData: JSON.stringify(data),
      requestUrl: reqUrl,
      method: method,
      responseData: res,
      date: getNowFormatDate(),
      isGateway: state.requestForm.isGateway
    }
    network.addNetworkItem(item)
  })
}

const newGateway = (dataReq, reqUrl, method) => {
  toNetworkNew(dataReq, reqUrl, method).then((res: any) => {
    const { code, data } = res
    if (code === "000") {
      res.data = JSON.parse(data)
      ElMessage.success("请求成功！")
    } else {
      console.log(code, "code")
    }
    state.requestData = res
    const item = {
      requestData: JSON.stringify(data),
      requestUrl: reqUrl,
      method: method,
      responseData: res,
      date: getNowFormatDate(),
      isGateway: state.requestForm.isGateway
    }
    network.addNetworkItem(item)
  })
}

watch(
  () => state.requestForm.request,
  (newVal, oldVal) => {
    if (!isJson(newVal)) {
      console.log("new" + newVal, "old" + oldVal)
      return
    }
    let data: any = JSON.parse(newVal)
    data = Object.prototype.toString.call(data) === "[object String]" ? JSON.parse(data) : data
    let all: Array<any> = []
    const keys: Array<any> = Object.entries(data)
    if (keys.length <= 0) {
      return
    }
    for (let i = 0; i < keys.length; i++) {
      const item = {
        key: "",
        value: ""
      } as RequestValueForm
      item.key = keys[i][0]
      item.value = keys[i][1]
      all = [...all, item]
    }
    requestData.dataAll = all
  },
  { deep: true }
)

watchEffect(
  () => {
    const pathView: any = toRaw(route)
    console.log(pathView.params.value, network.tableState.isSet, "pathView")
    if (pathView.params.value.index && !network.tableState.isSet) {
      setData(pathView)
    }
  },
  {
    flush: "post"
  }
)

const setData = (pathView) => {
  network.tableState.tableData = useNetworkStoreHook().networkList
  const list = network.tableState.tableData[pathView.params.value.index]
  if (list) {
    state.requestForm = {
      networkPath: list.requestUrl,
      request: list.requestData,
      method: list.method,
      isGateway: list.isGateway
    }
    state.requestData = list.responseData
    ElMessage.success("载入成功！")
    network.showItem(true)
  }
}

const isJson = ($string) => {
  if ($string.length <= 0) {
    return
  }
  try {
    return typeof JSON.parse($string) == "object" || "string"
  } catch (e) {
    console.log(e)
    ElMessage.error("数据格式化失败！")
    return false
  }
}
</script>

<template>
  <div class="app-container">
    <el-form
      ref="requestFormDom"
      label-width="120px"
      :model="state.requestForm"
      :rules="state.requestRules"
      @keyup.enter="state.handleLogin"
    >
      <el-form-item prop="networkPath" label="Request URL">
        <el-input
          v-model="state.requestForm.networkPath"
          placeholder="Request URL"
          type="text"
          tabindex="1"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="method" label="method">
        <el-input v-model="state.requestForm.method" placeholder="method" type="text" tabindex="2" size="large" />
      </el-form-item>
      <el-form-item prop="request" label="Response">
        <el-input
          v-model="state.requestForm.request"
          placeholder="Response"
          type="textarea"
          tabindex="3"
          :autosize="{ minRows: 6 }"
          show-password
        />
      </el-form-item>
      <el-form-item v-for="(item, index) in requestData.dataAll" :key="index">
        <el-col :span="4">
          <el-input v-model="item.key" placeholder="key" type="text" size="large" />
        </el-col>
        <el-col :span="10" style="margin-left: 10px">
          <el-input v-model="item.value" placeholder="value" type="text" size="large" />
        </el-col>
        <el-col :span="2" class="text-center" v-if="index === 0">
          <el-button type="primary" :icon="CirclePlusFilled" circle @click="requestData.addData" />
        </el-col>
        <el-col :span="2" class="text-center" v-if="index !== 0">
          <el-button type="danger" :icon="CircleClose" circle @click="requestData.removeData(index)" />
        </el-col>
        <el-button type="primary" v-if="index === 0" @click="requestData.generateData">生成数据</el-button>
      </el-form-item>
      <el-form-item label="新旧网关">
        <el-switch v-model="state.requestForm.isGateway" />
        <div style="padding-left: 20px" :class="state.requestForm.isGateway ? 'text-green' : 'text-red'">
          {{ state.requestForm.isGateway ? "请求老网关" : "请求新网关" }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="large" @click.prevent="state.resetResponse"> 清空</el-button>
        <el-button :loading="state.loading" type="primary" size="large" @click.prevent="state.handleLogin">
          发起请求
        </el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="120px">
      <el-form-item prop="password" label="返回数据">
        <json-viewer :value="state.requestData" :expand-depth="5" copyable boxed sort expanded />
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.jv-container.jv-light {
  width: 100% !important;
}
</style>
