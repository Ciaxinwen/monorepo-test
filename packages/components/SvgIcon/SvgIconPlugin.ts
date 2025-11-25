import { loadSvgSprite } from './loadSvgSprite'

/**
 * SvgIcon插件配置选项
 */
export interface SvgIconPluginOptions {
  // SVG sprite的URL路径
  svgSpriteUrl?: string
}

/**
 * SvgIcon插件
 */
export const SvgIconPlugin = {
  install: (_app: any, options: SvgIconPluginOptions = {}) => {
    // 如果提供了svgSpriteUrl，则加载SVG sprite
    if (options.svgSpriteUrl) {
      loadSvgSprite(options.svgSpriteUrl).catch((error) => {
        console.error('Failed to load SVG sprite:', error)
      })
    }
  },
}

export default SvgIconPlugin
