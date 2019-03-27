# 一个基于 create-react-app 和 react-app-rewired 开箱即用的一个基础项目骨架。

> 本项目想法源自于 既希望能直接享受到 cra 带来的可升级的机制，
> 又能够和 vue-cli@2 一样支持一些基础的配置项，
> 于是利用 react-app-rewired 和 环境变量 的支持 把部分选项直接写成了配置项。
> 支持直接修改配置项使用。

支持 module.css / module.less 等 css module 语法，推荐使用 `npm i -S classnames` 库来更好的使用 css module

添加了 antd / react-router / rematch(redux) / react-hot-loader 等基础内容

基于 react-loadable 实现的按照路由的代码拆分。

基于 eslint / standard / prettier / husky 实现了项目代码风格(Lint Tools)的统一（自动格式化 使用了 standard 的代码风格

## 使用说明

当需要写入使用的全局环境变量时，需使用 `process.env.REACT_APP_XXX = xxx` 形式才能拿到。 （只支持字符串）

使用 `%REACT_APP_XXX%` 方式获取


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
