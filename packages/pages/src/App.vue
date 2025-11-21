<template>
  <a-config-provider :theme="themeStore.currentTheme">
    <div id="app">
      <!-- 路由视图显示 -->
      <router-view />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

// 组件挂载时加载保存的主题设置
onMounted(() => {
  themeStore.loadThemeFromLocalStorage()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}

:deep(.router-link-active) {
  font-weight: bold;
}
</style>
