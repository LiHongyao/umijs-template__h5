import React, { FC } from 'react';
import './index.less';

const NotFound: FC = () => {
  return (
    <div className="no-data">
      <img 
        src="https://img.meituan.net/csc/b8dc984b0f717bda7464e747b0fc909988525.png"
        alt="404 缺省图"
        className="no-data__img"
      />
      <p className="no-data__tips">您所访问的页面不存在 ~</p>
    </div>
  )
}
export default NotFound;


