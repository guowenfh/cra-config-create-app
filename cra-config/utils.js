const paths = require('react-scripts/config/paths');


const isProduction  = process.env.NODE_ENV === 'production'


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
    overrideAppBuildPath
}