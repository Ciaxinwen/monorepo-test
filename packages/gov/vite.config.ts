import { defineConfig } from 'vite'
import { setupPlugin } from '../../build/plugin'
import { resolve } from 'path'

export default defineConfig(() => {
  return {
    base: '/gov',
    plugins: setupPlugin(),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
