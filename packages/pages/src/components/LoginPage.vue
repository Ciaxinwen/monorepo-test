<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5"
  >
    <a-card class="w-full max-w-md shadow-2xl">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">用户登录</h2>
        <p class="text-gray-600 text-sm">欢迎回来，请登录您的账户</p>
      </div>

      <a-form :model="form" :rules="rules" ref="loginFormRef" @finish="handleLogin" class="mb-6">
        <a-form-item name="username">
          <template #label>
            <span class="font-medium text-gray-700">用户名</span>
          </template>
          <a-input
            v-model:value="form.username"
            size="large"
            placeholder="请输入用户名"
            allow-clear
          >
            <template #prefix>
              <UserOutlined class="text-gray-400" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <template #label>
            <span class="font-medium text-gray-700">密码</span>
          </template>
          <a-input-password
            v-model:value="form.password"
            size="large"
            placeholder="请输入密码"
            allow-clear
          >
            <template #prefix>
              <LockOutlined class="text-gray-400" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <div class="flex justify-between items-center">
            <a-checkbox v-model:checked="form.rememberMe"> 记住我 </a-checkbox>
            <a-button type="link" size="small" class="text-blue-500 hover:underline">
              忘记密码？
            </a-button>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            :loading="isLoading"
            class="w-full"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="text-center text-gray-600 text-sm">
        <p>
          没有账户？
          <a-button type="link" size="small" class="text-blue-500 font-medium hover:underline">
            立即注册
          </a-button>
        </p>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

const router = useRouter()

// 表单引用
const loginFormRef = ref<FormInstance>()

// 表单数据
const form = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

// 加载状态
const isLoading = ref(false)

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名至少需要3个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少需要6个字符', trigger: 'blur' },
  ],
}

// 登录方法
const handleLogin = async () => {
  try {
    isLoading.value = true

    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 这里可以添加实际的登录逻辑
    console.log('登录信息:', {
      username: form.username,
      rememberMe: form.rememberMe,
    })

    message.success('登录成功！')

    // 登录成功后跳转到主页
    router.push('/home')

    // 重置表单
    if (!form.rememberMe) {
      loginFormRef.value?.resetFields()
    }
  } catch (error) {
    console.error('登录失败:', error)
    message.error('登录失败，请检查用户名和密码')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 480px) {
  .ant-card {
    margin: 1rem;
  }
}
</style>
