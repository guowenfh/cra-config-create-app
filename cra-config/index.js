const config = require('./config')
const {overrideProductionSourceMap, overrideAppBuildPath} = require('./utils')
const isProduction  = process.env.NODE_ENV === 'production'
const buildConfig = isProduction ? config.build : {}
const { override, addLessLoader, addBundleVisualizer } = require('customize-cra');
const devConfig = isProduction ? config.dev : {}

const overrides = [
    addLessLoader(),
    addBundleVisualizer({}, true)
]

// 如果时构建环境
if(isProduction){
    // overrides.push(
    //     addBundleVisualizer({}, true)
    // )
    // 重写正式构建时，是否需要 sourceMap
    overrideProductionSourceMap(buildConfig.productionSourceMap)

    overrideAppBuildPath(buildConfig.appBuild)
}

module.exports = () => override(...overrides);

