import React, { CSSProperties, memo, useEffect, useState } from 'react';
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
  onTap?: () => void;
}
const Button: React.FC<IProps> = props => {
  // props
  const {
    text,
    round,
    customCls,
    backgroundColor,
    loading,
    loadingText = '处理中...',
    style,
    icon,
    disabled,
    onTap,
  } = props;
  // state
  const [cls, setCls] = useState('');
  // events
  const _onTap = () => {
    !loading && !disabled && onTap && onTap();
  };
  // effects
  useEffect(() => {
    let _cls = '';
    round && (_cls += ` round`);
    customCls && (_cls += ` ${customCls}`);
    disabled && (_cls += ` disabled`);
    setCls(_cls);
  }, []);

  return (
    <div
      className={`lg-button ${cls}`}
      style={{ background: backgroundColor, ...style }}
      onClick={_onTap}
    >
      {loading ? (
        <>
          <img
            width="30"
            src={icon || require('./images/loading.png')}
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
