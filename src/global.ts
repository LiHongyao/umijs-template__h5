import 'default-passive-events';
import Schemes from 'lg-schemes';
import vconsole from 'vconsole';

// 1. 配置scheme
const base =
  process.env.FLAG === 'development' ? '' : '二级目录地址（如果必要）';
Schemes.config('项目scheme地址', base);

// 2. vconsole
if (process.env.NAME !== 'production') {
  new vconsole();
}
