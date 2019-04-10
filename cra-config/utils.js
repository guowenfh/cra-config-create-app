const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')
const fs = require('fs')
const isEnvProduction = process.env.NODE_ENV === 'production'
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
/**
 * 添加 react hot loader
 *
 * @param {String} env
 */
const overrideReactHotLoader = env => config => rewireReactHotLoader(config, env)
/**
 * 重写开发时 source map
 */
const overrideDevtool = () => config => {
  config.devtool = isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-eval-source-map'
  console.error(config)
  return config
}

/**
 * 重写正式构建时，是否需要 sourceMap
 * @param {Boolean} productionSourceMap
 */
function overrideProductionSourceMap(productionSourceMap) {
  if (productionSourceMap === false) {
    process.env.GENERATE_SOURCEMAP = false
  }
}
/**
 * 重写正式构建时，是否需要 sourceMap
 * @param {String} path
 */
function overrideAppBuildPath(path) {
  if (path) {
    paths.appBuild = path
  }
}

/**
 * 重写 构建时的配置
 */
const overrideOptimization = () => config => {
  config.optimization.splitChunks = {
    chunks: 'async',
    // minSize: 30000, // 模块大于30k会被抽离到公共模块
    // minChunks: 3, // 模块出现1次就会被抽离到公共模块
    // maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
    // maxInitialRequests: 3, // 入口模块最多只能加载3个
    name: true,
    cacheGroups: {
      vendors: {
        test(file) {
          // console.error(file.resource)
          if (file.resource && /\.jsx?$/.test(file.resource)) {
            if (/node_modules/i.test(file.resource)) {
              return true
            }
            return false
          }
          return false
        },
        name: 'vendor',
        chunks: 'all',
        minChunks: 2,
        priority: -10,
        enforce: true,
        reuseExistingChunk: true
      },
      default: {
        minChunks: 3,
        priority: 10,
        reuseExistingChunk: true
      }
    }
  }
  config.optimization.runtimeChunk = {
    name: 'manifest'
  }
  return config
}

/**
 * 修改antd的主题色
 */
function overrideThemeConfig() {
  const pkgPath = path.join(__dirname, '../package.json')
  const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
  let theme = {}
  if (pkg.theme && typeof pkg.theme === 'string') {
    let cfgPath = pkg.theme
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(__dirname, '..', cfgPath)
    }
    const config = require(cfgPath)
    theme = config
  } else if (pkg.theme && typeof pkg.theme === 'object') {
    theme = pkg.theme
  }
  return theme
}
module.exports = {
  overrideProductionSourceMap,
  overrideDevtool,
  overrideAppBuildPath,
  overrideReactHotLoader,
  overrideThemeConfig,
  overrideOptimization
}
