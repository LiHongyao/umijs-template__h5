import React, { memo, FC } from 'react';

import './PullRefresh.less';
import { kPullDownStatus } from './index';

interface Iprops {
  height?: string;
  color?: string;
  status?: kPullDownStatus;
}

const PullRefresh: FC<Iprops> = props => {
  let {
    color = '#999999',
    status = kPullDownStatus.REFRESH,
    height = '80px',
  } = props;

  const statusText = (status: kPullDownStatus) => {
    switch (status) {
      case kPullDownStatus.REFRESH:
        return '下拉刷新数据';
      case kPullDownStatus.LOADING:
        return '数据加载中，请稍后...';
      case kPullDownStatus.MORE:
      case kPullDownStatus.NO_MORE:
      case kPullDownStatus.DONE:
        return '数据加载完成';
    }
  };

  return (
    <div className="lg-pull-refresh" style={{ height }}>
      {/* loading图标 */}
      {status === kPullDownStatus.LOADING && (
        <div className="lg-pull-refresh__gif">
          <div className="load1">
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
          </div>
          <div className="load2">
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
          </div>
          <div className="load3">
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
            <div style={{ background: color }} />
          </div>
        </div>
      )}
      {/* 文字 */}
      <div className="lg-pull-refresh__text" style={{ color }}>
        {statusText(status)}
      </div>
    </div>
  );
};

export default memo(PullRefresh);
