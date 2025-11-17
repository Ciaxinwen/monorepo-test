<template>
  <div id="app">
    <!-- 路由视图显示 -->
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#app {
  min-height: 100vh;
}

:deep(.router-link-active) {
  font-weight: bold;
}
</style>
