import React, { CSSProperties, memo, useState } from 'react';
import './index.less';

interface IProps {
  text: string | number;
  style?: CSSProperties;
  width?: number;
  height?: number;
  customCls?: string;
  backgroundColor?: string;
  round?: boolean;
  loading?: boolean;
  loadingText?: string;
  onTap?: () => void;
}
const Button: React.FC<IProps> = props => {
  // props
  const {
    text,
    round,
    customCls,
    backgroundColor = '#F82F5C',
    loading,
    loadingText = '处理中...',
    style,
    onTap,
  } = props;
  // state
  // events
  const _onTap = () => {
    !loading && onTap && onTap();
  };

  return (
    <div
      className={`lg-button ${round ? 'round' : ''} ${
        customCls ? customCls : ''
      }`}
      style={{ background: backgroundColor, ...style }}
      onClick={_onTap}
    >
      {loading ? (
        <>
          <img
            width="30"
            src={require('./images/loading.png')}
            className="lg-button__loading"
          />
          <span>{loadingText}</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default memo(Button);
