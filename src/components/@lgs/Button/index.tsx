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

  onDisabled?: () => void /**禁用状态时点击 */;
  onTap?: () => void /**点击按钮 */;
}
const Button: React.FC<IProps> = props => {
  // props
  const { loadingText = '处理中...' } = props;
  // state
  const [cls, setCls] = useState('');
  // events
  const _onTap = () => {
    if (props.disabled) {
      props.onDisabled && props.onDisabled();
    } else {
      !props.loading && props.onTap && props.onTap();
    }
  };
  // effects
  useEffect(() => {
    let _cls = '';
    props.round && (_cls += ` round`);
    props.customCls && (_cls += ` ${props.customCls}`);
    props.disabled && (_cls += ` disabled`);
    setCls(_cls);
  }, [props.round, props.customCls, props.disabled]);

  return (
    <div
      className={`lg-button ${cls}`}
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
