import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  presets: [presetWind4()],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9',
      },
      dark: {
        bg: '#141414',
        bgElevated: '#1f1f1f',
        bgLayout: '#141414',
        text: '#d9d9d9',
        textSecondary: '#a6a6a6',
        border: '#303030',
        split: '#303030',
      },
      light: {
        bg: '#ffffff',
        bgElevated: '#ffffff',
        bgLayout: '#ffffff',
        text: 'rgba(0, 0, 0, 0.88)',
        textSecondary: 'rgba(0, 0, 0, 0.45)',
        border: '#d9d9d9',
        split: '#f0f0f0',
      },
    },
  },
  // 移除darkSelector配置，使用默认的暗色模式选择器
  shortcuts: {
    'theme-bg': 'bg-white dark:bg-dark-bg',
    'theme-bg-elevated': 'bg-white dark:bg-dark-bgElevated',
    'theme-text': 'text-light-text dark:text-dark-text',
    'theme-text-secondary': 'text-light-textSecondary dark:text-dark-textSecondary',
    'theme-border': 'border-light-border dark:border-dark-border',
    'theme-split': 'border-light-split dark:border-dark-split',
  },
  rules: [
    // 移除可能有问题的规则，因为我们已经定义了shortcuts
  ],
})
