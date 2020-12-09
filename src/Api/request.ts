import { extend, RequestOptionsInit } from 'umi-request';
import { Toast } from 'antd-mobile';
import Tools from 'lg-tools';
import Cookie from 'lg-cookie';
import Schemes from 'lg-schemes';

const service = extend({
  prefix: process.env.HOST,
  timeout: 10000,
  errorHandler: error => {
    if (/timeout/.test(error.message)) {
      Toast.info('请求超时');
    } else {
      Toast.info('系统升级，请稍后再试');
    }
    return null;
  },
});

// 请求拦截
service.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // GET请求添加时间戳
  if (options.method && /get/i.test(options.method)) {
    options.params = {
      ...options.params,
      timeState: Tools.randomCharacters(1, 'uppercase') + Date.now(),
    };
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookie.get('token') || '',
      },
    },
  };
});

// 响应拦截
service.interceptors.response.use(async response => {
  const res = await response.clone().json();
  switch (res.code) {
    case 0:
      return res;
    case -10:
      Schemes.jump('/login');
      break;
    default:
      Toast.info(res.msg);
      return res;
  }
});
export default service;
