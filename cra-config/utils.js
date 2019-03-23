const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')
const fs = require('fs')
/**
 * 添加 react hot loader
 *
 * @param {String} env
 */
const overrideReactHotLoader = env => config => rewireReactHotLoader(config, env)

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
  overrideAppBuildPath,
  overrideReactHotLoader,
  overrideThemeConfig
}
