const fs = require('fs')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  alias: {
    '@': resolveApp('src')
  },
  // 开发环境
  dev: {
    /**
     * 是否启用 https 的构建
     * 修改 host， port 等。
     * 如果 process.env.xxx 有对应的值，那么会覆盖这里的配置
     */
    HTTPS: false,
    HOST: '0.0.0.0',
    PORT: 5000,
    /**
     s* 在 webpack 中 是否启用 eslint 检查
     */
    useEslint: true,
    /**
     * 是否自动打开浏览器
     */
    autoOpenBrowser: true,
    /**
     * 本地服务器代理的配置
     */
    proxyTable: {}
  },
  // 构建正式
  build: {
    /**
     * 在 webpack 中 是否启用 eslint 检查
     */
    useEslint: false,
    /**
     * 构建时打包文件夹
     */
    appBuild: resolveApp('dist'),
    /**
     * 是否启用 sourcemap
     */
    productionSourceMap: false
  }
}
