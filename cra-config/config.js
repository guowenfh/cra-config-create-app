
const fs = require('fs');
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
  build: {
    /**
     * 构建时打包文件夹
     */
    appBuild: resolveApp('dist'),
    /**
     * 是否启用 sourcemap
     */
    productionSourceMap: false,

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
