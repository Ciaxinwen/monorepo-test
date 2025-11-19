<template>
  <div class="dashboard">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">仪表盘</h1>
      <p class="text-gray-600">欢迎回到管理系统</p>
    </div>

    <!-- 数据统计面板 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <a-card
        v-for="stat in statistics"
        :key="stat.title"
        class="text-center shadow-md hover:shadow-lg transition-shadow"
        :class="stat.colorClass"
      >
        <div class="flex items-center justify-center gap-3">
          <component :is="stat.icon" class="text-2xl" />
          <div>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <div class="text-sm opacity-75">{{ stat.title }}</div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 快速操作 -->
    <div class="mb-8">
      <a-card title="快速操作" class="shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a-button
            v-for="action in quickActions"
            :key="action.title"
            type="default"
            class="h-20 flex flex-col items-center justify-center"
            @click="handleActionClick(action.action)"
          >
            <component :is="action.icon" class="text-xl mb-1" />
            {{ action.title }}
          </a-button>
        </div>
      </a-card>
    </div>

    <!-- 最近活动 -->
    <a-card title="最近活动" class="shadow-lg">
      <template #extra>
        <a-button type="link" @click="viewAllActivities">查看全部</a-button>
      </template>

      <a-timeline>
        <a-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :color="activity.color"
        >
          <template #dot>
            <component :is="activity.icon" class="text-xl" />
          </template>
          <div class="flex justify-between items-start">
            <div>
              <div class="font-medium">{{ activity.title }}</div>
              <div class="text-sm text-gray-500">{{ activity.description }}</div>
            </div>
            <div class="text-sm text-gray-400">{{ activity.time }}</div>
          </div>
        </a-timeline-item>
      </a-timeline>
    </a-card>

    <!-- Pinia 使用示例 -->
    <Counter />
  </div>
</template>

<script setup lang="ts">
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  BellOutlined,
  EyeOutlined,
  DollarOutlined,
  RiseOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import Counter from '@/components/Counter.vue'
import { h } from 'vue'

const statistics = [
  {
    title: '用户总数',
    value: '1,234',
    icon: () => h(TeamOutlined),
    colorClass: 'bg-blue-50 border-blue-200',
  },
  {
    title: '今日访问',
    value: '567',
    icon: () => h(EyeOutlined),
    colorClass: 'bg-green-50 border-green-200',
  },
  {
    title: '本月收入',
    value: '¥89,000',
    icon: () => h(DollarOutlined),
    colorClass: 'bg-yellow-50 border-yellow-200',
  },
  {
    title: '增长率',
    value: '+12.5%',
    icon: () => h(RiseOutlined),
    colorClass: 'bg-purple-50 border-purple-200',
  },
]

const quickActions = [
  {
    title: '用户管理',
    icon: TeamOutlined,
    action: 'user-management',
  },
  {
    title: '系统设置',
    icon: SettingOutlined,
    action: 'system-settings',
  },
  {
    title: '数据统计',
    icon: DashboardOutlined,
    action: 'statistics',
  },
  {
    title: '消息中心',
    icon: BellOutlined,
    action: 'messages',
  },
]

const recentActivities = [
  {
    id: 1,
    title: '新用户注册',
    description: '用户 Zhang San 成功注册',
    time: '2 分钟前',
    icon: PlusCircleOutlined,
    color: 'blue',
  },
  {
    id: 2,
    title: '数据更新',
    description: '系统数据已自动同步',
    time: '15 分钟前',
    icon: EditOutlined,
    color: 'green',
  },
  {
    id: 3,
    title: '系统备份',
    description: '数据库备份完成',
    time: '1 小时前',
    icon: SettingOutlined,
    color: 'gray',
  },
  {
    id: 4,
    title: '用户删除',
    description: '管理员删除了测试账户',
    time: '3 小时前',
    icon: DeleteOutlined,
    color: 'red',
  },
]

const handleActionClick = (action: string) => {
  console.log('Action clicked:', action)
  // 这里可以添加具体的路由跳转逻辑
}

const viewAllActivities = () => {
  console.log('查看所有活动')
}
</script>

<style scoped>
.dashboard {
  /* 页面特定样式 */
}
</style>
