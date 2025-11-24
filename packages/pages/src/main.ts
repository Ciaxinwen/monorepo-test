import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import './style/global.css'

import { message } from 'ant-design-vue'

// 导入组件库
import components from '@monorepo-test/components'

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(router)
app.use(pinia)
// 使用组件库（已包含SvgIcon组件和插件）
app.use(components)

// 挂载应用
app.mount('#app')

// 全局配置 message
message.config({
  top: '50px',
  duration: 3,
  maxCount: 3,
})
