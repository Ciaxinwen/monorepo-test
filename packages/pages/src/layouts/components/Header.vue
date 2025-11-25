<template>
  <a-layout-header
    class="theme-bg shadow-sm px-4 fixed top-0 z-10 h-12"
    :class="collapsed ? 'left-13 right-0' : 'left-50 right-0'"
  >
    <div class="flex items-center justify-between h-full">
      <div class="flex items-center space-x-4">
        <a-button
          type="text"
          class="flex items-center justify-center"
          :icon="collapsed ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined)"
          @click="toggleCollapsed"
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
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'

// 定义props
const props = defineProps<{
  collapsed: boolean
  currentPageTitle: string
  userInfo: {
    name: string
    avatar: string
    role: string
  }
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const themeStore = useThemeStore()
const router = useRouter()

// 主题切换函数
const toggleTheme = () => {
  themeStore.toggleTheme()
  message.success(`已切换到${themeStore.isDark ? '暗黑' : '亮色'}模式`)
}

// 切换侧边栏折叠状态
const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
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
      // 这里通过emit事件让父组件处理用户信息的更新

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
</script>

<style lang="scss" scoped>
/* 暗黑模式样式 */
.dark .ant-layout-header {
  border-bottom: 1px solid #303030;
  background-color: #141414;
}
</style>
