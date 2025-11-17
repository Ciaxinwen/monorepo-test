# Pinia 状态管理使用指南

## 简介

Pinia 是 Vue 3 推荐的状态管理库，它提供了更简洁的 API 和更好的 TypeScript 支持。

## 安装

Pinia 已经安装在 `@monorepo-test/pages` 子包中：

```bash
pnpm add pinia
```

## 配置

### 1. 创建 Pinia 插件 (src/plugins/pinia.ts)

```typescript
import { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

export default {
  install(app: App) {
    app.use(pinia)
  },
}
```

### 2. 在 main.ts 中注册插件

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'

createApp(App).use(pinia).use(router).mount('#app')
```

## 使用方法

### 1. 创建 Store (src/stores/index.ts)

```typescript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
```

### 2. 在组件中使用 Store

```vue
<template>
  <div>
    <p>计数: {{ counter.count }}</p>
    <p>双倍计数: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">增加</button>
    <button @click="counter.decrement">减少</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores'

const counter = useCounterStore()
</script>
```

## 最佳实践

1. **命名规范**: Store 文件名使用 `useXXXStore` 格式
2. **组织结构**: 将相关的 stores 放在 `src/stores` 目录下
3. **类型安全**: 充分利用 TypeScript 的类型推断功能
4. **模块化**: 按功能模块划分不同的 store

## 参考资源

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue 3 官方文档](https://vuejs.org/)
