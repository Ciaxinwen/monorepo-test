<template>
  <div class="min-h-screen">
    <!-- 引入Sider组件 -->
    <Sider v-model:modelValue="collapsed" />

    <!-- 引入拆分后的组件 -->
    <Header
      :current-page-title="currentPageTitle"
      :user-info="userInfo"
      v-model:collapsed="collapsed"
    />
    <Main :collapsed="collapsed" />
    <Footer :collapsed="collapsed" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { findMenuItem } from '@/data/menu'
import Sider from './components/Sider.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// 响应式数据
const collapsed = ref(false)

// 用户信息（模拟数据）
const userInfo = ref({
  name: '管理员',
  avatar: '',
  role: '超级管理员',
})

// 计算当前页面标题
const currentPageTitle = computed(() => {
  const menuItem = findMenuItem(route.path)
  return menuItem ? menuItem.label : '未知页面'
})
</script>

<style lang="scss" scoped>
/* 主要布局样式已移至各组件 */
</style>
