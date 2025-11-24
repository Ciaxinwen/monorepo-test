<template>
  <div class="px-5 py-4 max-w-5xl mx-auto">
    <h2 class="text-2xl mb-6 text-gray-800 dark:text-white">SvgIcon组件演示</h2>

    <div class="mb-8 p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-lg mb-4 text-gray-600 dark:text-gray-300">基础用法</h3>
      <div class="flex gap-6 items-center flex-wrap text-gray-700 dark:text-gray-300">
        <SvgIcon name="home" />
        <SvgIcon name="user" />
        <SvgIcon name="settings" />
        <SvgIcon name="search" />
        <SvgIcon name="warning-rule" :size="32" color="#ff4d4f" />
      </div>
    </div>

    <div class="mb-8 p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-lg mb-4 text-gray-600 dark:text-gray-300">自定义大小</h3>
      <div class="flex gap-6 items-center flex-wrap text-gray-700 dark:text-gray-300">
        <SvgIcon name="home" :size="16" />
        <SvgIcon name="home" :size="24" />
        <SvgIcon name="home" :size="32" />
        <SvgIcon name="home" :size="48" />
      </div>
    </div>

    <div class="mb-8 p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-lg mb-4 text-gray-600 dark:text-gray-300">自定义颜色</h3>
      <div class="flex gap-6 items-center flex-wrap">
        <SvgIcon name="user" color="#ff4d4f" />
        <SvgIcon name="user" color="#1890ff" />
        <SvgIcon name="user" color="#52c41a" />
        <SvgIcon name="user" color="#faad14" />
      </div>
    </div>

    <div class="mb-8 p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-lg mb-4 text-gray-600 dark:text-gray-300">组合使用</h3>
      <div class="flex gap-6 items-center flex-wrap">
        <SvgIcon name="settings" :size="36" color="#722ed1" />
        <SvgIcon name="search" :size="40" color="#13c2c2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入SvgIcon组件
import { SvgIcon } from '@monorepo-test/components'
</script>

<style scoped>
/* 使用UnoCSS，无需传统CSS */
</style>
