<script lang="ts" setup>
import { ref, watchEffect } from "vue"
import { beJson } from "@/hooks/web/useJson"
import LosslessJSON from "json-bigint"

const beJsonFun = beJson()
const dialogTableData = ref({})
const data = ref("")

watchEffect(
  () => {
    if (!beJsonFun.isJson(data.value, true)) {
      return
    }
    const list = LosslessJSON({ storeAsString: true }).parse(data.value)
    dialogTableData.value = arrFilter(list)
  },
  {
    flush: "post"
  }
)

const arrFilter = (arr) => {
  for (const x in arr) {
    const itemType = beJsonFun.judgeType(arr[x])
    let item = arr[x]
    item = beJsonFun.caseType(item, itemType)
    if (beJsonFun.judgeType(item) === "[object Object]" || beJsonFun.judgeType(item) === "[object Array]") {
      arr[x] = arrFilter(item)
    }
  }
  return arr
}
</script>
<template>
  <div class="app-container">
    <div style="padding-bottom: 20px">
      <el-input
        v-model="data"
        placeholder="请输入"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 10 }"
        show-password
      />
    </div>
    <json-viewer :value="dialogTableData" :expand-depth="5" copyable boxed sort expanded />
  </div>
</template>
