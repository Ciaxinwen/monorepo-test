import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  CloudOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
import { h } from 'vue'

export interface MenuItem {
  key: string
  icon?: any
  label: string
  path?: string
  children?: MenuItem[]
}

export const menuData: MenuItem[] = [
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
    path: '/home',
  },
  {
    key: 'user-management',
    icon: () => h(TeamOutlined),
    label: '用户管理',
    children: [
      {
        key: 'user-list',
        icon: () => h(UserOutlined),
        label: '用户列表',
        path: '/home/users',
      },
      {
        key: 'user-roles',
        icon: () => h(SecurityScanOutlined),
        label: '角色管理',
        path: '/home/roles',
      },
      {
        key: 'user-permissions',
        icon: () => h(SecurityScanOutlined),
        label: '权限管理',
        path: '/home/permissions',
      },
    ],
  },
  {
    key: 'content',
    icon: () => h(FileTextOutlined),
    label: '内容管理',
    children: [
      {
        key: 'articles',
        icon: () => h(FileTextOutlined),
        label: '文章管理',
        path: '/home/articles',
      },
      {
        key: 'categories',
        icon: () => h(FileTextOutlined),
        label: '分类管理',
        path: '/home/categories',
      },
    ],
  },
  {
    key: 'analytics',
    icon: () => h(BarChartOutlined),
    label: '数据统计',
    children: [
      {
        key: 'traffic',
        icon: () => h(BarChartOutlined),
        label: '访问统计',
        path: '/home/traffic',
      },
      {
        key: 'performance',
        icon: () => h(BarChartOutlined),
        label: '性能监控',
        path: '/home/performance',
      },
      {
        key: 'revenue',
        icon: () => h(ShoppingCartOutlined),
        label: '收入统计',
        path: '/home/revenue',
      },
    ],
  },
  {
    key: 'system',
    icon: () => h(SettingOutlined),
    label: '系统设置',
    children: [
      {
        key: 'general',
        icon: () => h(SettingOutlined),
        label: '基本设置',
        path: '/home/settings',
      },
      {
        key: 'database',
        icon: () => h(DatabaseOutlined),
        label: '数据库',
        path: '/home/database',
      },
      {
        key: 'logs',
        icon: () => h(FileTextOutlined),
        label: '系统日志',
        path: '/home/logs',
      },
    ],
  },
  {
    key: 'tools',
    icon: () => h(ToolOutlined),
    label: '工具',
    children: [
      {
        key: 'backup',
        icon: () => h(CloudOutlined),
        label: '备份管理',
        path: '/home/backup',
      },
      {
        key: 'maintenance',
        icon: () => h(ToolOutlined),
        label: '系统维护',
        path: '/home/maintenance',
      },
    ],
  },
  {
    key: 'notifications',
    icon: () => h(BellOutlined),
    label: '消息通知',
    path: '/home/notifications',
  },
  {
    key: 'svg-icon-example',
    icon: () => h(AppstoreOutlined),
    label: 'SVG图标示例',
    path: '/home/svg-icon-example',
  },
]

// 扁平化菜单数据，用于高亮当前菜单项
export const flattenMenuData = (menus: MenuItem[]): MenuItem[] => {
  const result: MenuItem[] = []

  const flatten = (items: MenuItem[]) => {
    items.forEach((item) => {
      result.push(item)
      if (item.children) {
        flatten(item.children)
      }
    })
  }

  flatten(menus)
  return result
}

// 查找当前路径对应的菜单项
export const findMenuItem = (path: string): MenuItem | undefined => {
  const flattenMenus = flattenMenuData(menuData)
  return flattenMenus.find((menu) => menu.path === path)
}
