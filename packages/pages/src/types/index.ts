// 用户相关类型
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
  expiresIn: number
}

// 文章相关类型
export interface Article {
  id: number
  title: string
  content: string
  summary?: string
  author: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  coverImage?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface CreateArticleRequest {
  title: string
  content: string
  summary?: string
  category: string
  tags: string[]
  coverImage?: string
  status: 'draft' | 'published'
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: number
}

// 文件上传相关类型
export interface FileLike {
  name: string
  size: number
  type: string
  lastModified: number
}

// 统计数据类型
export interface Statistics {
  totalUsers: number
  totalArticles: number
  totalViews: number
  activeUsers: number
  todayViews: number
  todaySignups: number
  weeklyGrowth: number
  monthlyGrowth: number
}

// 系统配置类型
export interface SystemConfig {
  siteName: string
  siteDescription: string
  allowRegistration: boolean
  maxUploadSize: number
  uploadAllowedTypes: string[]
}
