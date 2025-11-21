<template>
  <a-layout-footer
    class="text-center theme-bg border-t theme-border py-4 px-6 fixed bottom-0"
    :class="collapsed ? 'left-20 right-0' : 'left-60 right-0'"
  >
    <div class="theme-text-secondary text-sm">Monorepo Test ©2024 Created by Your Team</div>
  </a-layout-footer>
</template>

<script setup lang="ts">
// 定义props
defineProps<{
  collapsed: boolean
}>()
</script>

<style lang="scss" scoped>
/* 暗黑模式样式 */
.dark .ant-layout-footer {
  border-top: 1px solid #303030;
  background-color: #141414;
  color: rgba(255, 255, 255, 0.85);
}

/* 响应式设计 - 移动端适配 */
@media (max-width: 768px) {
  /* 调整底部在移动端的样式 */
  .ant-layout-footer {
    left: 0 !important;
    right: 0 !important;
  }
}
</style>
