import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import './style/global.css'

import { message } from 'ant-design-vue'

createApp(App).use(Antd).use(router).use(pinia).mount('#app')

// 全局配置 message
message.config({
  top: '100px',
  duration: 3,
  maxCount: 3,
})
