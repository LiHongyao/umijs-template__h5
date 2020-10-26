import { Toast  } from 'antd-mobile';
import vconsole from 'vconsole'

// 1. 全局配置Toast
Toast.config({
  duration: 1,
  mask: true
});

// 2. 配置vconsole
if(process.env.FLAG === 'development') {
  new vconsole();
}


