<template>
  <a-config-provider :theme="themeStore.currentTheme" :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import { useThemeStore } from './stores/theme'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const themeStore = useThemeStore()

// 组件挂载时加载保存的主题设置
onMounted(() => {
  themeStore.loadThemeFromLocalStorage()
})
</script>

<style scoped>
:deep(.router-link-active) {
  font-weight: bold;
}
</style>
