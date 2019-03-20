const config = require('./config')
const {overrideProductionSourceMap, overrideAppBuildPath} = require('./utils')
const isProduction  = process.env.NODE_ENV === 'production'
const buildConfig = isProduction ? config.build : {}

const devConfig = isProduction ? config.dev : {}

module.exports = () => {
    // 如果时构建环境
    if(isProduction){
        // 重写正式构建时，是否需要 sourceMap
        overrideProductionSourceMap(buildConfig.productionSourceMap)

        overrideAppBuildPath(buildConfig.appBuild)
        return
    }
}

