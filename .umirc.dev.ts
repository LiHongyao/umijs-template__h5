import { defineConfig } from 'umi';

let HOST = {
  '后端A': '后端A的服务器地址',
  '后端B': '后端B的服务器地址'
}

export default defineConfig({
  define: {
    "process.env.HOST": HOST.后端A,
    "process.env.FLAG": 'development',
  },
});