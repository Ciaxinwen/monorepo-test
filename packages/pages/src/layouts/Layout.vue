<template>
  <div class="min-h-screen">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="theme-bg shadow-md fixed left-0 top-0 h-full z-20"
      width="240"
    >
      <!-- Logo区域 -->
      <div class="flex items-center justify-center h-16 border-b theme-border">
        <div class="text-lg font-bold theme-text">
          <template v-if="!collapsed"> Monorepo Test </template>
          <template v-else> MT </template>
        </div>
      </div>

      <!-- 菜单 -->
      <a-menu
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        mode="inline"
        class="border-r-0"
        :items="menuData"
        @click="handleMenuClick"
      />
    </a-layout-sider>

    <!-- 主体布局 -->
    <div class="relative" :class="collapsed ? 'ml-20' : 'ml-60'">
      <!-- 顶部导航栏 -->
      <a-layout-header
        class="theme-bg shadow-sm px-4 fixed top-0 z-10 h-16"
        :class="collapsed ? 'left-20 right-0' : 'left-60 right-0'"
      >
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center space-x-4">
            <a-button
              type="text"
              class="flex items-center justify-center"
              :icon="collapsed ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined)"
              @click="collapsed = !collapsed"
            >
            </a-button>
            <div class="text-lg font-semibold theme-text">
              {{ currentPageTitle }}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- 暗黑模式切换按钮 -->
            <a-button
              type="text"
              @click="toggleTheme"
              class="flex items-center justify-center"
              :title="themeStore.isDark ? '切换到亮色模式' : '切换到暗黑模式'"
            >
              <template #icon>
                <BulbFilled v-if="themeStore.isDark" />
                <BulbOutlined v-else />
              </template>
            </a-button>

            <a-dropdown>
              <a-button type="text" class="flex items-center space-x-2">
                <template #icon>
                  <UserOutlined />
                </template>
                <span>{{ userInfo.name }}</span>
              </a-button>
              <template #overlay>
                <a-menu @click="handleUserMenuClick">
                  <a-menu-item key="profile">
                    <template #icon>
                      <UserOutlined />
                    </template>
                    个人资料
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">
                    <template #icon>
                      <LogoutOutlined />
                    </template>
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 主体内容区域 -->
      <a-layout-content class="p-6 pt-20 theme-bg">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer
        class="text-center theme-bg border-t theme-border py-4 px-6"
        :class="collapsed ? 'left-20 right-0' : 'left-60 right-0'"
      >
        <div class="theme-text-secondary text-sm">Monorepo Test ©2024 Created by Your Team</div>
      </a-layout-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, h, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons-vue'
import { menuData, findMenuItem, type MenuItem } from '@/data/menu'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const route = useRoute()
const router = useRouter()

// 主题切换函数
const toggleTheme = () => {
  themeStore.toggleTheme()
  message.success(`已切换到${themeStore.isDark ? '暗黑' : '亮色'}模式`)
}

// 响应式数据
const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

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

// 处理菜单点击
const handleMenuClick = ({ key }: { key: string }) => {
  const menuItem = findMenuByKey(menuData, key)
  if (menuItem && menuItem.path) {
    router.push(menuItem.path)
  }
}

// 递归查找菜单项
const findMenuByKey = (menus: MenuItem[], key: string): MenuItem | undefined => {
  for (const menu of menus) {
    if (menu.key === key) {
      return menu
    }
    if (menu.children) {
      const found = findMenuByKey(menu.children, key)
      if (found) return found
    }
  }
  return undefined
}

// 处理用户下拉菜单点击
const handleUserMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case 'profile':
      // 跳转到个人资料页面
      router.push('/profile')
      break
    case 'logout':
      // 退出登录逻辑
      handleLogout()
      break
  }
}

// 退出登录
const handleLogout = () => {
  // 显示确认对话框
  const modal = Modal.confirm({
    title: '确认退出',
    content: '您确定要退出登录吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      // 模拟退出登录操作
      console.log('用户退出登录')

      // 清除用户信息（在实际应用中这里应该清除token等认证信息）
      userInfo.value = { name: '', avatar: '', role: '' }

      // 跳转到登录页面
      router.push('/login')

      // 显示退出成功提示
      message.success('退出登录成功')

      modal.destroy()
    },
    onCancel: () => {
      modal.destroy()
    },
  })
}

// 监听路由变化，更新选中的菜单项
watch(
  () => route.path,
  (newPath) => {
    const menuItem = findMenuItem(newPath)
    if (menuItem) {
      selectedKeys.value = [menuItem.key]
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
/* 暗黑模式样式 */
.dark .ant-layout-sider {
  border-right: 1px solid #303030;
  background-color: #141414;
}

.dark .ant-layout-header {
  border-bottom: 1px solid #303030;
  background-color: #141414;
}

.dark .ant-layout-footer {
  border-top: 1px solid #303030;
  background-color: #141414;
  color: rgba(255, 255, 255, 0.85);
}

/* 响应式设计 - 移动端适配 */
@media (max-width: 768px) {
  /* 在小屏幕上隐藏侧边栏 */
  :deep(.ant-layout-sider) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  :deep(.ant-layout-sider.ant-layout-sider-collapsed) {
    transform: translateX(-100%);
  }

  /* 调整主体布局在移动端的边距 */
  .relative.ml-60,
  .relative.ml-20 {
    margin-left: 0 !important;
  }

  /* 调整顶部导航栏在移动端的样式 */
  :deep(.ant-layout-header) {
    left: 0 !important;
    right: 0 !important;
  }
}
</style>
