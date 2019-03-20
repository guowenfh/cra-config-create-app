const { override, addLessLoader } = require('customize-cra');
const overCraConfig = require('./cra-config/index')
// 重写部分与环境变量以及paths相关的东西
overCraConfig()





module.exports = override(
  addLessLoader(),
  // addBundleVisualizer()
);