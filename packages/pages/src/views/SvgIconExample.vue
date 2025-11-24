<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div
      class="py-10 px-5 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:from-indigo-800 dark:to-purple-800 mb-10"
    >
      <h1 class="text-3xl font-semibold mb-3">SVG图标组件示例</h1>
      <p class="text-base opacity-90">这是一个展示SvgIcon组件功能的示例页面</p>
    </div>

    <SvgIconDemo />
  </div>
</template>

<script setup lang="ts">
// 导入SvgIconDemo组件
import SvgIconDemo from '@/components/SvgIconDemo.vue'
</script>

<style scoped>
/* 使用UnoCSS，无需传统CSS */
</style>
