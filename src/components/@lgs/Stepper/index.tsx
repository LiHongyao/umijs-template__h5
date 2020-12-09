import React, { FC, memo } from 'react';
import './index.less';

interface IProps {
  value: number /** 默认值 */;
  disabled?: boolean /** 是否禁用 */;
  min?: number /** 最小值 */;
  max?: number /*** 最大值 */;
  step?: number /** 步进器 */;
  onChange: (value: number) => void /** 值变化 */;
}

const Stepper: FC<IProps> = props => {
  // 默认值
  const { min = 1, max = Infinity, step = 1 } = props;
  const onChange = (v: number) => {
    if (v < min) v = min;
    if (v > max) v = max;
    props.onChange(v);
  };

  // render
  return (
    <div className="lg-stepper">
      {/* - */}
      {props.disabled || props.value <= min ? (
        <section className="lg-stepper__item lg-stepper__buton lg-stepper__minus lg-stepper__disabled" />
      ) : (
        <section
          className="lg-stepper__item lg-stepper__buton lg-stepper__minus"
          onClick={() => onChange(props.value - step)}
        />
      )}
      {/* value */}
      <div className="lg-stepper__item lg-stepper__value">{props.value}</div>
      {/* + */}
      {props.disabled || props.value >= max ? (
        <section className="lg-stepper__item lg-stepper__buton lg-stepper__plus lg-stepper__disabled" />
      ) : (
        <section
          className="lg-stepper__item lg-stepper__buton lg-stepper__plus"
          onClick={() => onChange(props.value + step)}
        />
      )}
    </div>
  );
};

export default memo(Stepper);
