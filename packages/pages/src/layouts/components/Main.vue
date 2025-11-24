<template>
  <a-layout-content class="p-6 pt-20 theme-bg" :class="collapsed ? 'ml-20' : 'ml-60'">
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
/* 主体内容区域样式 */
.ant-layout-content {
  min-height: calc(100vh - 80px); /* 考虑顶部和底部的高度 */
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
