import { defineConfig } from 'umi';

// 开发中，可能配置了多个后端人员，为了方便操作
// 我们可以将起服务器地址存储起来，以便使用
let HOST = {
  '后端A': '后端A的服务器地址',
  '后端B': '后端B的服务器地址'
}

export default defineConfig({
  define: {
    "process.env.NAME": 'development',
    "process.env.HOST": HOST.后端A,
  },
});