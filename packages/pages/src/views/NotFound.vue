<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-code">404</h1>
      <h2 class="not-found-title">页面不存在</h2>
      <p class="not-found-message">抱歉，您访问的页面不存在或已被移除</p>
      <router-link to="/" class="not-found-button">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// NotFound组件，用于显示404页面
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.not-found-content {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.not-found-code {
  font-size: 72px;
  font-weight: 700;
  color: #1890ff;
  margin: 0 0 16px 0;
  line-height: 1;
}

.not-found-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.not-found-message {
  font-size: 16px;
  color: #666;
  margin: 0 0 24px 0;
}

.not-found-button {
  display: inline-block;
  padding: 8px 24px;
  background-color: #1890ff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s;
}

.not-found-button:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}
</style>
