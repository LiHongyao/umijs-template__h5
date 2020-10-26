import Cookie from '@/utils/cookie';
import { extend } from "umi-request";
import { Toast } from 'antd-mobile';
import { jump } from '@/utils/jumpSchemes';

const request = extend({
  prefix: process.env.HOST,
  timeout: 10000,
  errorHandler: (error) => {
    if (/timeout/.test(error.message)) {
      Toast.info('请求超时');
    } else {
      Toast.info('系统升级，请稍后再试');
    }
    return null;
  }
});

// 请求拦截
request.interceptors.request.use((url, options: any) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookie.get('token') || ''
      }
    }
  }
});

// 响应拦截
request.interceptors.response.use(async response => {
  const res = await response.clone().json();
  switch (res.code) {
    case 0:
      return res;
    case -10:
      jump('/login');
      break;
    default:
      Toast.info(res.msg);
      return res;
  }
});
export default request;