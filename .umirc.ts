import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 构建目录
  outputPath: '/build',
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存
  hash: true,
  // 路由模式
  history: { type: 'browser' },
  // 自定义字体
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
  // 支持sass => npm install node-sass
  /*
  sass: {
    implementation: require('node-sass'),
  },*/

  // 状态管理：dva
  dva: {},
  // 动态加载loading
  dynamicImport: {
    loading: '@/Loading',
  },
  // 移动端布局适配
  extraPostCSSPlugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
  ],
  // 路由管理
  routes: [
    // 主页
    { exact: true, path: '/', component: '@/pages/IndexPage' },
    // 404
    { path: '*', component: '@/pages/404' },
  ],
});
