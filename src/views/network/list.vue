<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { useNetwork } from "@/hooks/web/useNetwork"

const router = useRouter()

const network = useNetwork()

const handleClick = (index) => {
  const path = `Network`
  const data = { index: index }
  network.showItem(false)
  router.push({ name: path, params: data }).catch((err) => {
    console.warn(err)
  })
}

const handleDblClick = (row, column, cell, event) => {
  if (column.property) {
    const text = event.target.innerText
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        ElMessage.success("复制成功！")
      })
    } else {
      // 创建text area
      const oInput = document.createElement("input")
      oInput.value = text
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      console.log(oInput.value)
      document.execCommand("Copy") // 执行浏览器复制命令
      ElMessage.success("复制成功！")
      oInput.remove()
    }
  }
}

const dialogTableVisible = ref(false)
const dialogTableData = ref({})

const handleClickDialog = (index, row) => {
  dialogTableVisible.value = !dialogTableVisible.value
  dialogTableData.value = row.responseData
}

const handleDelClick = (index) => {
  network.delNetworkItem(index)
}
</script>

<template>
  <div class="app-container">
    <el-table :data="network.tableState.tableData" style="width: 100%" @cell-dblclick="handleDblClick">
      <el-table-column fixed prop="method" label="method" width="150" />
      <el-table-column prop="requestData" label="requestData" :show-overflow-tooltip="true" min-width="150" />
      <el-table-column prop="requestUrl" label="requestUrl" width="350" />
      <el-table-column prop="date" label="请求时间" width="200" />
      <el-table-column prop="isGateway" label="网关类型" width="100">
        <template #default="scope">
          <el-tag class="ml-2" :type="scope.row.isGateway ? 'success' : 'danger'">{{
            scope.row.isGateway ? "老网关" : "新网关"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClick(scope.$index)">发起</el-button>
          <el-button link type="primary" size="small" @click="handleClickDialog(scope.$index, scope.row)"
            >返回值</el-button
          >
          <el-button link type="primary" size="small" @click="handleDelClick(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="响应示例">
      <json-viewer :value="dialogTableData" :expand-depth="5" copyable boxed sort expanded />
    </el-dialog>
  </div>
</template>
<style>
.jv-container.jv-light {
  width: 100% !important;
}
</style>
