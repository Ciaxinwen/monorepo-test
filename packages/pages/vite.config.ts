import { defineConfig } from 'vite'
import { setupPlugin } from '../../build/plugin'
import { resolve } from 'path'

export default defineConfig(() => {
  return {
    base: '/',
    plugins: setupPlugin(),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
