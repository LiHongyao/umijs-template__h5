import classNames from 'lg-classnames';
import React, { CSSProperties, memo, useState } from 'react';
import './index.less';

interface IProps {
  text: string | number;
  icon?: any;
  style?: CSSProperties;
  width?: number;
  height?: number;
  customCls?: string;
  backgroundColor?: string;
  round?: boolean;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;

  onDisabled?: () => void /** 禁用状态时点击 */;
  onTap?: () => void /** 点击按钮 */;
}
const Button: React.FC<IProps> = props => {
  // props
  const { loadingText = '处理中...' } = props;
  // events
  const _onTap = () => {
    if (props.disabled) {
      if (props.onDisabled) props.onDisabled();
    } else {
      if (!props.loading && props.onTap) props.onTap();
    }
  };
  return (
    <div
      className={classNames([
        'lg-button',
        props.customCls,
        {
          round: props.round,
          disabled: props.disabled,
        },
      ])}
      style={{ background: props.backgroundColor, ...props.style }}
      onClick={_onTap}
    >
      {props.loading ? (
        <>
          <img
            width="30"
            src={props.icon || require('./images/loading.png')}
            className="lg-button__loading"
          />
          <span>{loadingText}</span>
        </>
      ) : (
        <span>{props.text}</span>
      )}
    </div>
  );
};

export default memo(Button);
