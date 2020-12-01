import { Toast } from 'antd-mobile';
import 'default-passive-events';
import vconsole from 'vconsole';

// 1. 全局配置Toast
Toast.config({
  duration: 1.5,
  mask: true,
});

// 2. vconsole
if (process.env.NAME !== 'production') {
  new vconsole();
}
