// API服务使用示例
import { api } from '../services'
import { type User, type LoginRequest } from '../types'

// 1. 用户认证相关示例
export const authExamples = {
  // 用户登录
  async login() {
    const loginData: LoginRequest = {
      username: 'admin',
      password: '123456',
    }

    try {
      const response = await api.auth.login(loginData)
      console.log('登录成功:', response.data)

      // 保存token到本地存储
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },

  // 获取当前用户信息
  async getCurrentUser() {
    try {
      const response = await api.auth.getCurrentUser()
      console.log('当前用户:', response.data)
      return response.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  },

  // 用户登出
  async logout() {
    try {
      await api.auth.logout()
      localStorage.removeItem('token')
      console.log('登出成功')
    } catch (error) {
      console.error('登出失败:', error)
      throw error
    }
  },
}

// 2. 用户管理相关示例
export const userExamples = {
  // 获取用户列表
  async getUserList(page = 1, pageSize = 10) {
    try {
      const response = await api.user.getUsers({
        page,
        pageSize,
        keyword: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      console.log('用户列表:', response.data)
      return response.data
    } catch (error) {
      console.error('获取用户列表失败:', error)
      throw error
    }
  },

  // 创建新用户
  async createUser() {
    const userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      username: 'newuser',
      email: 'newuser@example.com',
      avatar: '',
      role: 'user',
      status: 'active',
    }

    try {
      const response = await api.user.createUser(userData)
      console.log('创建用户成功:', response.data)
      return response.data
    } catch (error) {
      console.error('创建用户失败:', error)
      throw error
    }
  },

  // 更新用户信息
  async updateUser(id: number) {
    const updateData = {
      email: 'updated@example.com',
      role: 'admin',
    }

    try {
      const response = await api.user.updateUser(id, updateData)
      console.log('更新用户成功:', response.data)
      return response.data
    } catch (error) {
      console.error('更新用户失败:', error)
      throw error
    }
  },

  // 删除用户
  async deleteUser(id: number) {
    try {
      await api.user.deleteUser(id)
      console.log('删除用户成功')
    } catch (error) {
      console.error('删除用户失败:', error)
      throw error
    }
  },
}

// 3. 文章管理相关示例
export const articleExamples = {
  // 获取文章列表
  async getArticleList(page = 1, pageSize = 10) {
    try {
      const response = await api.article.getArticles({
        page,
        pageSize,
        status: 'published',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      console.log('文章列表:', response.data)
      return response.data
    } catch (error) {
      console.error('获取文章列表失败:', error)
      throw error
    }
  },

  // 获取文章详情
  async getArticleDetail(id: number) {
    try {
      const response = await api.article.getArticle(id)
      console.log('文章详情:', response.data)
      return response.data
    } catch (error) {
      console.error('获取文章详情失败:', error)
      throw error
    }
  },

  // 创建新文章
  async createArticle() {
    const articleData = {
      title: '新文章标题',
      content: '文章内容...',
      summary: '文章摘要',
      category: '技术',
      tags: ['Vue', 'TypeScript'],
      status: 'draft' as const,
    }

    try {
      const response = await api.article.createArticle(articleData)
      console.log('创建文章成功:', response.data)
      return response.data
    } catch (error) {
      console.error('创建文章失败:', error)
      throw error
    }
  },

  // 发布文章
  async publishArticle(id: number) {
    try {
      const response = await api.article.publishArticle(id)
      console.log('发布文章成功:', response.data)
      return response.data
    } catch (error) {
      console.error('发布文章失败:', error)
      throw error
    }
  },
}

// 4. 统计分析相关示例
export const statisticsExamples = {
  // 获取仪表盘数据
  async getDashboardStats() {
    try {
      const response = await api.statistics.getDashboardStats()
      console.log('仪表盘数据:', response.data)
      return response.data
    } catch (error) {
      console.error('获取仪表盘数据失败:', error)
      throw error
    }
  },

  // 获取访问统计
  async getVisitStats(startDate?: string, endDate?: string) {
    try {
      const response = await api.statistics.getVisitStats({
        startDate,
        endDate,
      })
      console.log('访问统计:', response.data)
      return response.data
    } catch (error) {
      console.error('获取访问统计失败:', error)
      throw error
    }
  },
}

// 5. 文件上传相关示例
export const uploadExamples = {
  // 上传单个文件
  async uploadSingleFile(file: File) {
    try {
      const response = await api.upload.uploadFile(file)
      console.log('文件上传成功:', response.data)
      return response.data
    } catch (error) {
      console.error('文件上传失败:', error)
      throw error
    }
  },

  // 上传多个文件
  async uploadMultipleFiles(files: File[]) {
    try {
      const response = await api.upload.uploadFiles(files)
      console.log('多文件上传成功:', response.data)
      return response.data
    } catch (error) {
      console.error('多文件上传失败:', error)
      throw error
    }
  },
}

// 6. 在Vue组件中的使用示例
export const vueComponentExample = `
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import api, { type PaginatedResponse } from '../services'
import type { User } from '../types'

// 响应式数据
const loading = ref(false)
const userList = ref<User[]>([])
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取用户列表
const fetchUsers = async (page = 1, pageSize = 10) => {
  loading.value = true
  try {
    const response = await api.user.getUsers({
      page,
      pageSize,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
    
    const data = response.data
    userList.value = data.list
    pagination.value = {
      current: data.page,
      pageSize: data.pageSize,
      total: data.total
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
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
    fetchUsers(pagination.value.current, pagination.value.pageSize)
  } catch (error) {
    console.error('创建用户失败:', error)
    message.error('创建用户失败')
  }
}

// 删除用户
const deleteUser = async (id: number) => {
  try {
    await api.user.deleteUser(id)
    message.success('删除用户成功')
    fetchUsers(pagination.value.current, pagination.value.pageSize)
  } catch (error) {
    console.error('删除用户失败:', error)
    message.error('删除用户失败')
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchUsers()
})
</script>
`
