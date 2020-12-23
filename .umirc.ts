import { defineConfig } from 'umi';

export default defineConfig({
  /** 设置 node_modules 目录下依赖文件的编译方式 */
  nodeModulesTransform: {
    type: 'none',
  },
  /** 配置别名，对引用路径进行映射 */
  alias: {},
  /** 构建目录 */
  outputPath: '/build',
  /** 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存 */
  hash: true,
  /** 路由模式 */
  history: { type: 'browser' },
  /** 自定义字体 */
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
  /** 设置要复制到输出目录的文件或文件夹*/
  /*
  copy: [
    {
      from: './src/public/images',
      to: '/images',
    },
  ],*/

  /** 支持sass => npm install node-sass*/
  /*
  sass: {
    implementation: require('node-sass'),
  },*/

  /** 启用dva状态管理 */
  dva: {},
  /** 是否启用按需加载 */
  dynamicImport: {
    /** 动态加载loading */
    loading: '@/Loading',
  },
  /** 移动端布局适配 */
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
  /** 忽略 moment 的 locale 文件，用于减少尺寸 */
  ignoreMomentLocale: true,
  /** 路由管理 */
  routes: [
    // 主页
    { exact: true, path: '/', component: '@/pages/IndexPage' },
    // 404
    { path: '*', component: '@/pages/404' },
  ],
});
