const routes = [
  // 主页
  { exact: true, path: '/', component: '@/pages/IndexPage' },
  // 404
  { path: '*', component: '@/pages/404' },
];

export default routes;
