# API服务使用指南

## 概述

本项目已成功架构重组，axios配置已抽离为独立的`@monorepo-test/axios`子包，API服务层位于`pages/src/services`中，提供了完整的API调用解决方案。

## 包结构

```
monorepo-test/
└── packages/
    ├── axios/              # axios配置包（专注于axios封装）
    │   ├── src/
    │   │   ├── request.ts  # axios 二次封装
    │   │   ├── types.ts    # 通用类型定义
    │   │   └── index.ts    # 统一导出
    │   └── package.json
    └── pages/              # 页面应用（包含API服务层）
        ├── src/
        │   ├── services/   # API服务层
        │   │   ├── api.ts      # 业务API定义
        │   │   └── index.ts    # 服务层导出
        │   ├── types/          # 业务相关类型定义
        │   │   └── index.ts
        │   └── docs/           # 使用文档
        ├── .env.development
        └── .env.production
```

## 在项目中使用

### 1. 引入依赖

在 `package.json` 中添加对axios包的依赖：

```json
{
  "dependencies": {
    "@monorepo-test/axios": "workspace:*"
  }
}
```

### 2. 在 Vue 组件中使用

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import api from '../services'
import type { User } from '../types'

const loading = ref(false)
const userList = ref<User[]>([])

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await api.user.getUsers({
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
    userList.value = response.data.list
  } catch (error) {
    message.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 创建用户
const createUser = async (userData: any) => {
  try {
    await api.user.createUser(userData)
    message.success('创建用户成功')
    fetchUsers()
  } catch (error) {
    message.error('创建用户失败')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
```

### 3. 在 Pinia Store 中使用

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import api from '../services'
import type { User } from '../types'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      const response = await api.user.getUsers()
      users.value = response.data.list
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    fetchUsers,
  }
})
```

### 4. 直接调用示例

```typescript
// 用户认证
const login = async () => {
  try {
    const response = await api.auth.login({
      username: 'admin',
      password: '123456',
    })
    localStorage.setItem('token', response.data.token)
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 文章管理
const getArticles = async () => {
  try {
    const response = await api.article.getArticles({
      page: 1,
      pageSize: 10,
      status: 'published',
    })
    return response.data
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

// 文件上传
const uploadFile = async (file: File) => {
  try {
    const response = await api.upload.uploadFile(file)
    return response.data
  } catch (error) {
    console.error('文件上传失败:', error)
  }
}
```

## 架构说明

### axios子包职责

- **专注于axios封装**：提供基础的HTTP请求封装
- **通用类型定义**：包含通用的API响应、分页等类型
- **拦截器配置**：请求/响应拦截器、错误处理等核心功能
- **可复用性**：可以在多个应用中独立使用

### pages子包职责

- **API服务层**：基于axios封装业务相关的API调用
- **业务类型定义**：用户、文章、统计等业务相关类型
- **具体业务逻辑**：认证、用户管理、文章管理等具体API调用

## axios包功能说明

### 核心文件

- **request.ts**: axios实例配置、请求/响应拦截器、错误处理
- **types.ts**: 通用TypeScript类型定义
- **index.ts**: 统一导出文件

### 导出的功能

```typescript
// 导入API服务
import api, { authApi, userApi, articleApi } from '../services'

// 导入请求方法（直接使用axios封装）
import { get, post, put, del } from '@monorepo-test/axios'

// 导入通用类型（来自axios包）
import type { ApiResponse, QueryParams, PaginatedResponse } from '@monorepo-test/axios'

// 导入业务相关类型（来自pages包）
import type { User, Article, LoginRequest } from '../types'
```

## 环境变量配置

### 开发环境 (.env.development)

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Monorepo Test
VITE_APP_DESCRIPTION=基于Vite + Vue3 + TypeScript的后台管理系统
```

### 生产环境 (.env.production)

```bash
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_TITLE=Monorepo Test
VITE_APP_DESCRIPTION=基于Vite + Vue3 + TypeScript的后台管理系统
```

## API 方法说明

### 基础请求方法

- `get<T>(url, params?)`: GET 请求
- `post<T>(url, data?)`: POST 请求
- `put<T>(url, data?)`: PUT 请求
- `del<T>(url)`: DELETE 请求

### 业务 API 模块

#### 认证 API (`api.auth`)

- `login(data)`: 用户登录
- `logout()`: 用户登出
- `getCurrentUser()`: 获取当前用户信息
- `refreshToken()`: 刷新 token

#### 用户 API (`api.user`)

- `getUsers(params?)`: 获取用户列表
- `getUser(id)`: 获取用户详情
- `createUser(data)`: 创建用户
- `updateUser(id, data)`: 更新用户
- `deleteUser(id)`: 删除用户
- `updateUserStatus(id, status)`: 更新用户状态

#### 文章 API (`api.article`)

- `getArticles(params?)`: 获取文章列表
- `getArticle(id)`: 获取文章详情
- `createArticle(data)`: 创建文章
- `updateArticle(id, data)`: 更新文章
- `deleteArticle(id)`: 删除文章
- `publishArticle(id)`: 发布文章
- `unpublishArticle(id)`: 撤回文章

#### 统计分析 API (`api.statistics`)

- `getDashboardStats()`: 获取仪表盘统计
- `getVisitStats(params?)`: 获取访问统计
- `getUserGrowthStats(params?)`: 获取用户增长统计

#### 系统配置 API (`api.config`)

- `getConfig()`: 获取系统配置
- `updateConfig(data)`: 更新系统配置

#### 文件上传 API (`api.upload`)

- `uploadFile(file)`: 上传单个文件
- `uploadFiles(files)`: 上传多个文件

## 错误处理

axios 已经内置了完善的错误处理机制：

1. **HTTP 错误状态码处理**
   - 400: 请求参数错误
   - 401: 未授权，请重新登录
   - 403: 拒绝访问
   - 404: 请求资源不存在
   - 500: 服务器内部错误

2. **统一错误消息提示**
   - 自动使用 `message.error()` 显示错误信息

3. **控制台日志输出**
   - 请求和响应都会输出日志，便于调试

## 最佳实践

1. **使用 try-catch 包装所有异步请求**
2. **在组件中设置 loading 状态提供用户反馈**
3. **根据业务需求扩展 API 服务**
4. **定期检查和更新类型定义**
5. **合理使用环境变量管理不同环境的配置**
6. **复用axios包中的配置，避免重复代码**

## 使用示例参考

完整的代码示例请查看：

- `src/examples/api-usage.ts` - API使用示例代码

## 注意事项

1. **架构分层清晰**：
   - axios子包专注于HTTP请求封装，不包含业务逻辑
   - API服务层位于pages/src/services中，处理具体业务API调用
   - 业务类型定义在pages/src/types中

2. **import路径**：
   - API服务：`import api from '../services'`
   - 业务类型：`import type { User } from '../types'`
   - axios方法：`import { get, post } from '@monorepo-test/axios'`

3. **配合路由守卫处理认证状态**
4. **在生产环境中正确配置 API 基础 URL**
5. **妥善处理 token 的存储和刷新**
6. **axios包作为独立模块，可以在多个应用间共享使用**
