<template>
  <a-layout-content
    class="p-4 pt-16 bg-[#f5f5f5] .dark:bg-[#1f1f1f] overflow-auto"
    :class="collapsed ? 'ml-13' : 'ml-50'"
  >
    <router-view />
  </a-layout-content>
</template>

<script setup lang="ts">
// 定义props
defineProps<{
  collapsed: boolean
}>()
</script>

<style lang="scss" scoped>
.ant-layout-content {
  height: 100vh;
}

/* 响应式设计 - 移动端适配 */
@media (max-width: 768px) {
  /* 调整主体布局在移动端的边距 */
  .ant-layout-content.ml-60,
  .ant-layout-content.ml-20 {
    margin-left: 0 !important;
  }
}
</style>
