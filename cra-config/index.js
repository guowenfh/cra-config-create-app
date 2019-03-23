const config = require('./config')
const {
  overrideProductionSourceMap,
  overrideThemeConfig,
  overrideReactHotLoader,
  overrideAppBuildPath
} = require('./utils')
const {
  override,
  addLessLoader,
  addBundleVisualizer,
  disableEsLint,
  fixBabelImports,
  useEslintRc,
  addWebpackAlias
} = require('customize-cra')
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const overrides = [
  useEslintRc(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: overrideThemeConfig()
  }),
  addBundleVisualizer({}, true),
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  fixBabelImports('lodash', {
    libraryName: 'lodash',
    libraryDirectory: '',
    camel2DashComponentName: false // default: true
  }),
  addWebpackAlias(config.alias)
]

// 开发环境的配置
if (isDevelopment) {
  overrides.push(overrideReactHotLoader(process.env.NODE_ENV))
  if (config.dev.useEslint === false) {
    overrides.push(disableEsLint())
  }

  if (config.dev.autoOpenBrowser === false) {
    process.env.BROWSER = 'none'
  }
  if (!process.env.PORT) {
    process.env.PORT = config.dev.PORT
  }
  if (!process.env.HOST) {
    process.env.HOST = config.dev.HOST
  }
  if (!process.env.HTTPS) {
    process.env.HTTPS = config.dev.HTTPS
  }
}

// 如果是构建环境
if (isProduction) {
  // overrides.push(
  //     addBundleVisualizer({}, true)
  // )
  // 重写正式构建时，是否需要 sourceMap
  overrideProductionSourceMap(config.build.productionSourceMap)

  overrideAppBuildPath(config.build.appBuild)
}

module.exports = () => ({
  webpack: override(...overrides),
  devServer: configFunction => (proxy, allowedHost) => {
    const newConfig = configFunction(config.dev.proxyTable, allowedHost)
    return newConfig
  }
})
