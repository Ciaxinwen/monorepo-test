// ESLint 9.x 配置文件 (CommonJS 格式)
const js = require('@eslint/js')

// 导出配置
module.exports = [
  // 基础配置 - 忽略所有不支持的文件类型
  {
    ignores: [
      'node_modules/',
      'dist/',
      '**/*.vue',
      '**/*.ts',
      '**/*.tsx',
      '**/auto-imports.d.ts',
      '**/components.d.ts',
      '**/build/**',
    ],
  },

  // 仅对配置文件应用基本规则
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
    },
    rules: {},
  },
]