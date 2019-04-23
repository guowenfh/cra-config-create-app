# 一个基于 create-react-app 和 react-app-rewired 开箱即用的一个基础项目骨架。

> 本项目想法源自于 既希望能直接享受到 cra 带来的可升级的机制，
> 又能够和 vue-cli@2 一样支持一些基础的配置项，
> 于是利用 react-app-rewired 和 环境变量 的支持 把部分选项直接写成了配置项。
> 支持直接修改配置项使用。

支持 module.css / module.less 等 css module 语法，推荐使用 `npm i -S classnames` 库来更好的使用 css module

内置了 `husky` 与 `eslint-config-standard` 与 `prettier-eslint` 来运行 `git commit` 时代码的自动格式化。自动格式化 使用了 `standard` 的代码风格

状态管理工具方面使用 `@rematch` , 并且内置了插件 `@rematch/immer` 以及 `@rematch/loading`

具体使用方式参考: [Rematch实践指南](https://rematch.gitbook.io/handbook/cha-jian)

内置了组件库 `antd` 结合 `babel-plugin-import` 做了组件（`lodash`也可以）的按需引入 (直接修改 `src/theme.js` 可以修改主题色)。当然要用别的组件库也是可行的，需要改的东西很少不是嘛？

使用 `react-router-config` 来达到和 `vue-router` 类似的体验。

结合 `react-loadable` 与 `import()` 实现了路由的按需加载

`package.json` 使用了 `~` 版本，来尽量保证安装时依赖升级导致项目报错问题

对于 `mock` 数据的需求，使用`npm run dev-mock`启动服务，实现了两种途径的mock数据：
1. 直接 `webpack-dev-server` 提供的 `proxyTable`
2. 使用本地 `mock` 数据，在 `mocker`文件夹下，修改添加即可， 或者使用 `easymock` 这样类似的在线 mock 服务，基于这样的需求实现了一个 `apiProxy` 的高阶函数，提供了本地mock的支持，当然他也能够比较方便的进行各种需求的改造。

```js
/**
 * 拦截请求函数，只在 开发并且开启了mock的情况下启用
 * @param {Function} fn
 * @returns {fn}
 */
const apiProxy = fn => {
  if (process.env.NODE_ENV === 'development' && process.env.mock === true) {
    return function(url, data = {}, otherOptions = {}) {
      return import('../mocker/index').then(({ default: mocker }) => {
      // 如果未找到 mock 对应的数据的情况依旧走老代码
        if (!mocker[url]) {
          return fn.call(this, url, data, otherOptions)
        }
        const isFn = typeof mocker[url] === 'function'
        // 如果是一个函数那么一定要返回 Promise
        if (isFn) {
          return mocker[url](data)
        }
        // 其他情况，直接使用Promsie返回值
        return mocker[url]
      })
    }
  }
  return function(...args) {
    return fn.apply(this, args)
  }
}
```

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
