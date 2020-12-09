import React, { memo, FC } from 'react';
import { kPullUpStatus } from './index';
import './LoadMore.less';

interface Iprops {
  height?: string;
  color?: string;
  status?: kPullUpStatus;
  visible?: boolean;
}

const LoadMore: FC<Iprops> = props => {
  const {
    color = '#999999',
    visible = false,
    status = kPullUpStatus.MORE,
  } = props;

  const statusText = (_status: kPullUpStatus) => {
    switch (_status) {
      case kPullUpStatus.MORE:
        return '上拉加载更多';
      case kPullUpStatus.NO_MORE:
        return '没有更多啦~';
      case kPullUpStatus.LOADING:
        return '数据加载中，请稍后...';
      case kPullUpStatus.LOADED:
        return '加载完成';
    }
  };

  return (
    <div className="lg-load-more" style={{ opacity: visible ? 1 : 0 }}>
      <div className="lg-load-more__wrapper">
        {/* loading图标 */}
        {status === kPullUpStatus.LOADING && (
          <div className="lg-load-more__gif">
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
        <div className="lg-load-more__text" style={{ color }}>
          {statusText(status)}
        </div>
      </div>
    </div>
  );
};

export default memo(LoadMore);
