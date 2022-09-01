## 特性

- **Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API
- **Element Plus**：Element UI 的正统续作
- **Pinia**: 传说中的 Vuex5
- **Vite**：真的很快
- **Vue Router**：没啥好说的
- **TypeScript**：JavaScript 语言的超集
- **PNPM**：更快速的，节省磁盘空间的包管理工具
- **Sass**：和 Element Plus 保持一致
- **ESlint**：代码校验
- **Prettier**：代码格式化
- **Axios**：没啥好说的，已封装好
- **UnoCSS**：具有高性能且极具灵活性的即时原子化 CSS 引擎
- **注释**：各个配置项都写有尽可能详细的注释

## 🚀 开发

```bash
# 配置
1. 安装 .vscode 中推荐的插件
3. node 版本 16+
4. pnpm 版本 7.x

# 安装依赖
pnpm i

# 初始化 husky
pnpm prepare

# 启动服务
pnpm dev
```

## ✔️ 预览

```bash
# 预览预发布环境
pnpm preview:stage

# 预览正式环境
pnpm preview:prod
```

## 📦️ 多环境打包

```bash
# 构建预发布环境
pnpm build:stage

# 构建正式环境
pnpm build:prod
```

## 🔧 代码格式检查

```bash
pnpm lint
```
