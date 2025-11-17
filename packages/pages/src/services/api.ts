import { get, post, put, del } from '@monorepo-test/axios'
import type { ApiResponse, PaginatedResponse, QueryParams } from '@monorepo-test/axios'
import type {
  User,
  LoginRequest,
  LoginResponse,
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
  Statistics,
  SystemConfig,
  FileLike,
} from '../types'

// 认证相关API
export const authApi = {
  // 用户登录
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return post('/auth/login', data)
  },

  // 用户登出
  logout: (): Promise<ApiResponse> => {
    return post('/auth/logout')
  },

  // 获取当前用户信息
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return get('/auth/me')
  },

  // 刷新token
  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return post('/auth/refresh')
  },
}

// 用户管理API
export const userApi = {
  // 获取用户列表
  getUsers: (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<User>>> => {
    return get('/users', params)
  },

  // 获取用户详情
  getUser: (id: number): Promise<ApiResponse<User>> => {
    return get(`/users/${id}`)
  },

  // 创建用户
  createUser: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> => {
    return post('/users', data)
  },

  // 更新用户
  updateUser: (id: number, data: Partial<User>): Promise<ApiResponse<User>> => {
    return put(`/users/${id}`, data)
  },

  // 删除用户
  deleteUser: (id: number): Promise<ApiResponse> => {
    return del(`/users/${id}`)
  },

  // 更新用户状态
  updateUserStatus: (id: number, status: User['status']): Promise<ApiResponse<User>> => {
    return put(`/users/${id}/status`, { status })
  },
}

// 文章管理API
export const articleApi = {
  // 获取文章列表
  getArticles: (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Article>>> => {
    return get('/articles', params)
  },

  // 获取文章详情
  getArticle: (id: number): Promise<ApiResponse<Article>> => {
    return get(`/articles/${id}`)
  },

  // 创建文章
  createArticle: (data: CreateArticleRequest): Promise<ApiResponse<Article>> => {
    return post('/articles', data)
  },

  // 更新文章
  updateArticle: (
    id: number,
    data: Partial<UpdateArticleRequest>
  ): Promise<ApiResponse<Article>> => {
    return put(`/articles/${id}`, data)
  },

  // 删除文章
  deleteArticle: (id: number): Promise<ApiResponse> => {
    return del(`/articles/${id}`)
  },

  // 发布文章
  publishArticle: (id: number): Promise<ApiResponse<Article>> => {
    return put(`/articles/${id}/publish`)
  },

  // 撤回文章
  unpublishArticle: (id: number): Promise<ApiResponse<Article>> => {
    return put(`/articles/${id}/unpublish`)
  },

  // 获取文章分类
  getCategories: (): Promise<ApiResponse<string[]>> => {
    return get('/articles/categories')
  },
}

// 统计分析API
export const statisticsApi = {
  // 获取仪表盘统计数据
  getDashboardStats: (): Promise<ApiResponse<Statistics>> => {
    return get('/statistics/dashboard')
  },

  // 获取访问统计
  getVisitStats: (params?: { startDate?: string; endDate?: string }): Promise<ApiResponse> => {
    return get('/statistics/visits', params)
  },

  // 获取用户增长统计
  getUserGrowthStats: (params?: { startDate?: string; endDate?: string }): Promise<ApiResponse> => {
    return get('/statistics/user-growth', params)
  },
}

// 系统配置API
export const configApi = {
  // 获取系统配置
  getConfig: (): Promise<ApiResponse<SystemConfig>> => {
    return get('/config')
  },

  // 更新系统配置
  updateConfig: (data: Partial<SystemConfig>): Promise<ApiResponse<SystemConfig>> => {
    return put('/config', data)
  },
}

// 文件上传API
export const uploadApi = {
  // 上传单个文件
  uploadFile: (file: FileLike): Promise<ApiResponse<{ url: string; filename: string }>> => {
    const formData = new FormData()
    formData.append('file', file as any)
    return post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // 上传多个文件
  uploadFiles: (
    files: FileLike[]
  ): Promise<ApiResponse<Array<{ url: string; filename: string }>>> => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file as any)
    })
    return post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// 统一导出所有API
export default {
  auth: authApi,
  user: userApi,
  article: articleApi,
  statistics: statisticsApi,
  config: configApi,
  upload: uploadApi,
}
