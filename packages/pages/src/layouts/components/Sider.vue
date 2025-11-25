<template>
  <a-layout-sider
    :collapsed="modelValue"
    :collapsedWidth="52"
    @update:collapsed="updateCollapsed"
    :trigger="null"
    collapsible
    class="theme-bg shadow-md fixed left-0 top-0 h-full z-20"
    width="200"
  >
    <!-- Logo区域 -->
    <div class="flex items-center justify-center h-12 border-b theme-border theme-bg">
      <div class="flex items-center gap-2 theme-text">
        <img :src="vueLogo" alt="Vue Logo" class="h-8" />
        <div v-if="!modelValue" class="text-lg font-bold">Monorepo Test</div>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuData, findMenuItem, type MenuItem } from '@/data/menu'
import vueLogo from '@/assets/vue.svg'

// 定义props和emits
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 更新折叠状态
const updateCollapsed = (value: boolean) => {
  emit('update:modelValue', value)
}

const route = useRoute()
const router = useRouter()

// 响应式数据
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

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

<style lang="scss" scoped>
/* 确保Sider内容区域可滚动 */
:deep(.ant-layout-sider-children) {
  /* 使用flex布局，让logo和菜单垂直排列 */
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  /* 确保滚动条样式应用到sider */
  scrollbar-width: thin;
  /* 确保内容区域宽度固定，滚动条不影响布局 */
  width: 100%;
  box-sizing: border-box;
}

/* Logo区域固定 */
:deep(.ant-layout-sider-children) > div:first-child {
  position: sticky;
  top: 0;
  z-index: 10;
  /* 确保logo区域宽度固定，不受滚动条影响 */
  width: 100%;
  /* 确保边框完整显示 */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  /* 防止logo区域被压缩 */
  flex-shrink: 0;
  /* 确保背景色完整覆盖，包括边框区域 */
  box-sizing: border-box;
}

/* 菜单区域占据剩余空间 */
:deep(.ant-menu) {
  flex: 1;
  /* 移除默认的overflow，让滚动由sider-children控制 */
  overflow: visible;
  /* 确保菜单区域宽度固定 */
  width: 100%;
}

/* 暗黑模式样式 */
.dark .ant-layout-sider {
  border-right: 1px solid #303030;
  background-color: #141414;
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
}
</style>
