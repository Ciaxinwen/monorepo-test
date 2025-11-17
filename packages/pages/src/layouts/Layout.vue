<template>
  <div class="min-h-screen">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="bg-white shadow-md fixed left-0 top-0 h-full z-20"
      width="240"
    >
      <!-- Logo区域 -->
      <div class="flex items-center justify-center h-16 border-b border-gray-100">
        <div class="text-lg font-bold text-gray-800">
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
        @click="handleMenuClick"
      >
        <template v-for="item in menuData" :key="item.key">
          <a-sub-menu v-if="item.children" :key="item.key">
            <template #title>
              <component v-if="item.icon" :is="item.icon" />
              <span>{{ item.label }}</span>
            </template>
            <a-menu-item v-for="child in item.children" :key="child.key">
              <component v-if="child.icon" :is="child.icon" />
              <span>{{ child.label }}</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="`menu-item-${item.key}`">
            <component v-if="item.icon" :is="item.icon" />
            <span>{{ item.label }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 主体布局 -->
    <div class="relative" :class="collapsed ? 'ml-20' : 'ml-60'">
      <!-- 顶部导航栏 -->
      <a-layout-header
        class="bg-white shadow-sm px-4 fixed top-0 z-10 h-16 w-full"
        :class="collapsed ? 'left-20' : 'left-60'"
      >
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center space-x-4">
            <a-button type="text" @click="collapsed = !collapsed">
              <template #icon>
                <MenuUnfoldOutlined v-if="collapsed" />
                <MenuFoldOutlined v-else />
              </template>
            </a-button>
            <div class="text-lg font-semibold text-gray-700">
              {{ currentPageTitle }}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <a-dropdown>
              <a-button type="text">
                <template #icon>
                  <UserOutlined />
                </template>
                管理员
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <UserOutlined />
                    个人资料
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 主体内容区域 -->
      <a-layout-content class="p-6 pt-20">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer class="text-center bg-white border-t border-gray-100">
        <div class="text-gray-500 text-sm">Monorepo Test ©2024 Created by Your Team</div>
      </a-layout-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue'
import { menuData, findMenuItem, type MenuItem } from '@/data/menu'

const route = useRoute()
const router = useRouter()

// 响应式数据
const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

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

<style scoped>
/* Layout样式 - 白色调主题 */
:deep(.ant-layout-sider) {
  background-color: #ffffff !important;
  border-right: 1px solid #f0f0f0;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

:deep(.ant-layout-content) {
  background-color: #ffffff !important;
  min-height: calc(100vh - 64px);
}

:deep(.ant-layout-header) {
  background-color: #ffffff !important;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.ant-layout-footer) {
  background-color: #ffffff !important;
  border-top: 1px solid #f0f0f0;
}

:deep(.ant-menu) {
  background-color: #ffffff !important;
  border-right: none !important;
}

:deep(.ant-menu-item) {
  margin: 2px 0 !important;
  color: #595959;
  border-radius: 6px !important;
  margin-left: 8px !important;
  margin-right: 8px !important;
}

:deep(.ant-menu-item:hover) {
  background-color: #f5f5f5 !important;
  color: #1890ff !important;
}

:deep(.ant-menu-item-selected) {
  background-color: #e6f7ff !important;
  color: #1890ff !important;
}

:deep(.ant-menu-submenu-title) {
  margin: 2px 0 !important;
  color: #595959;
  border-radius: 6px !important;
  margin-left: 8px !important;
  margin-right: 8px !important;
}

:deep(.ant-menu-submenu-title:hover) {
  background-color: #f5f5f5 !important;
  color: #1890ff !important;
}

:deep(.ant-menu-submenu .ant-menu-item) {
  margin-left: 16px !important;
  margin-right: 8px !important;
}

:deep(.ant-menu-item-selected::after) {
  display: none;
}

:deep(.ant-menu-inline .ant-menu-item-selected) {
  background-color: transparent !important;
  color: #1890ff !important;
}

:deep(.ant-menu-inline .ant-menu-item:hover) {
  background-color: transparent !important;
  color: #1890ff !important;
}

:deep(.ant-menu-inline .ant-menu-submenu-title:hover) {
  background-color: transparent !important;
  color: #1890ff !important;
}

:deep(.ant-dropdown-menu) {
  background-color: #ffffff !important;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
