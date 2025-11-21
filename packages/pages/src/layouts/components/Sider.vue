<template>
  <a-layout-sider
    :collapsed="modelValue"
    @update:collapsed="updateCollapsed"
    :trigger="null"
    collapsible
    class="theme-bg shadow-md fixed left-0 top-0 h-full z-20"
    width="240"
  >
    <!-- Logo区域 -->
    <div class="flex items-center justify-center h-16 border-b theme-border">
      <div class="text-lg font-bold theme-text">
        <template v-if="!modelValue"> Monorepo Test </template>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuData, findMenuItem, type MenuItem } from '@/data/menu'

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
