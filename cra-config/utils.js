const paths = require('react-scripts/config/paths');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')


const isProduction  = process.env.NODE_ENV === 'production'


/**
 * 添加 react hot loader
 *
 * @param {String} env
 */
const overrideReactHotLoader = (env) => (config)=> rewireReactHotLoader(config, env)

/**
 * 重写正式构建时，是否需要 sourceMap
 * @param {Boolean} productionSourceMap
 */
function overrideProductionSourceMap(productionSourceMap) {
    if(productionSourceMap === false){
        process.env.GENERATE_SOURCEMAP = false
    }
}
/**
 * 重写正式构建时，是否需要 sourceMap
 * @param {String} path
 */
function overrideAppBuildPath(path) {
    if(path){
        paths.appBuild = path
    }
}

module.exports = {
    overrideProductionSourceMap,
    overrideAppBuildPath,
    overrideReactHotLoader
}