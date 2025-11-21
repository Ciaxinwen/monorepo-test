import { theme } from 'ant-design-vue'
import { defineStore } from 'pinia'

// 定义主题配置
export const darkTheme = {
  algorithm: theme.darkAlgorithm,
}

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),

  getters: {
    currentTheme: (state) => (state.isDark ? darkTheme : lightTheme),
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.updateHtmlClass()
      this.saveThemeToLocalStorage()
    },

    setDarkTheme(isDark: boolean) {
      this.isDark = isDark
      this.updateHtmlClass()
      this.saveThemeToLocalStorage()
    },

    updateHtmlClass() {
      const html = document.documentElement
      if (this.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    },

    saveThemeToLocalStorage() {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    loadThemeFromLocalStorage() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
        this.updateHtmlClass()
      } else {
        // 默认检查系统主题偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.setDarkTheme(prefersDark)
      }
    },
  },
})
