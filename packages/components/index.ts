import type { App } from 'vue'
import { default as Button } from './Button/Index.vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'
import { SvgIconPlugin } from './SvgIcon/SvgIconPlugin'

// 所有组件的列表
const components = {
  Button,
  SvgIcon,
}

// 安装函数，用于全局注册所有组件
export const install = (app: App) => {
  // 注册所有组件
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })

  // 注册SvgIcon插件，提供SVG sprite的URL
  app.use(SvgIconPlugin, {
    svgSpriteUrl: '/icons/svg-sprite.svg',
  })
}

// 导出插件和单独组件
export { Button, SvgIcon, SvgIconPlugin }

// 默认导出
export default {
  install,
  Button,
  SvgIcon,
  SvgIconPlugin,
}
