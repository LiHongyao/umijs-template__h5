import { defineConfig } from 'umi';
export default defineConfig({
  // 1. 部署至二级目录，比如部署到“umi-ddou-h5”目录下，则配置如下：
  // base: '/umi-ddou-h5/',
  // publicPath: '/umi-ddou-h5/',
  // 2. 定义环境变量
  define: {
    "process.env.NAME": 'test',
    "process.env.HOST": '此处为测试环境服务器地址'
  },
});