<script lang="ts" setup>
import { reactive, onMounted } from "vue"
import { marked } from "marked"

type menuType = {
  menuList: Array<string | number>
  menuData: Array<string | number>
  menuSelect: number
  menuShow: string
}

/*
 *导入markdown文件夹下所以md文件，导入为字符串 配置为raw
 * */
const modules = import.meta.glob("./markdown/*.md", { as: "raw" })
const modulesArray = Object.entries(modules)
console.log(modules)
const noteData = reactive<menuType>({
  menuList: [],
  menuData: [],
  menuSelect: 0,
  menuShow: ""
})

modulesArray.map((item: any) => {
  const str = item[1].split("\n")
  noteData.menuList = [...noteData.menuList, str[0]]
  noteData.menuData = [...noteData.menuData, item[1]]
})

const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: "",
  mangle: true,
  pedantic: false,
  sanitize: false,
  silent: false,
  smartLists: false,
  placement: undefined,
  smartypants: false,
  xhtml: false
})

onMounted(() => {
  setHtml(noteData.menuData[0])
})

const setHtml = (str: any) => {
  noteData.menuShow = marked(str)
}

const handleOpen = (e) => {
  setHtml(noteData.menuData[e.index])
}
</script>
<template>
  <el-row class="common-height">
    <el-col :span="5" class="tac">
      <div class="menu-title">目录</div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="String(noteData.menuSelect)"
        text-color="#fff"
      >
        <el-menu-item
          v-for="(item, index) in noteData.menuList"
          :index="String(index)"
          :key="index"
          @click="handleOpen"
        >
          <span>{{ item }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="19" class="tac">
      <div v-html="noteData.menuShow" class="markdown-body" v-highlight />
    </el-col>
  </el-row>
</template>
<style lang="scss">
.common-height {
  height: 100%;
}

.tac {
  overflow-y: auto;
  height: calc(100vh - var(--v3-header-height));
}

.tac::-webkit-scrollbar {
  // 直接修改样式就可以了
  width: 2px;
}
// 	滚动条
.tac::-webkit-scrollbar {
  width: 1px;
}
// 滚动条轨道
.tac::-webkit-scrollbar-track {
  width: 1px;
  background-color: #545c64;
}
// 滚动条滑块
.tac::-webkit-scrollbar-thumb {
  border: 1px solid #42b983;
}

.el-menu {
  min-height: calc(100% - 50px);
  border: none;
}

.menu-title {
  height: 50px;
  background: #545c64;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.markdown-body {
  padding: 10px;
}
</style>
