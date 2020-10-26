import { defineConfig } from 'umi';
export default defineConfig({
  // 部署至二级目录，eg：/umi-ddou-h5
  // base: '/umi-ddou-h5/',
  // publicPath: '/umi-ddou-h5/',
  define: {
    "process.env.FLAG": 'development',
    "process.env.HOST": ''
  },
});