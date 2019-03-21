一个基于 create-react-app 和 react-app-rewired 一个开箱即用的一个基础项目骨架。

把部分选项直接写成了配置项。想法源自于 vue-cli@2

已经支持的配置如下：

```js
{
  // 开发环境
  dev:{
    /**
     * 是否启用 https 的构建
     * 修改 host， port 等。
     * 如果 process.env.xxx 有对应的值，那么会覆盖这里的配置
     */
    HTTPS: false,
    HOST: '0.0.0.0',
    PORT: 5000,
    /**
     s* 是否启用 eslint 检查
     */
    useEslint: true,
    /**
     * 是否自动打开浏览器
     */
    autoOpenBrowser: false,

  },
  // 构建正式
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

```