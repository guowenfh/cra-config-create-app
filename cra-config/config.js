
const fs = require('fs');
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
  dev:{
    /**
     * 是否启用 https 的构建
     */
    https: false,
    /**
     * 是否启用 eslint 检查
     */
    useEslint: true,
  },
  build: {
    /**
     * 构建时打包文件夹
     */
    appBuild: resolveApp('dist'),
    /**
     * 是否启用 sourcemap
     */
    productionSourceMap: false,

  }
}
