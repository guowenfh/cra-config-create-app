一个基于 create-react-app 和 react-app-rewired 一个开箱即用的一个基础项目骨架。

添加了 antd / react-router / rematch(redux) / react-hot-loader 等基础内容

基于 react-loadable 实现的代码拆分

基于 eslint / prettier / husky 实现了项目代码风格的统一（自动格式化

源自于 vue-cli@2 的想法，把部分选项直接写成了配置项。支持直接修改配置项使用

已经支持的配置如下： `cra-config/config.js`



```js
 {
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



```