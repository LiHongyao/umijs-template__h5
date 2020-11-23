import React, { FC, memo, useEffect, useState } from 'react';
import './index.less';

interface IProps {
  value: string;
  visible: boolean;
  digits?: number /**小数点前的位数 */;
  max?: number /**可输入的最大值 */;
  onChange: (value: string) => void /**数值变化 */;
  onClose: () => void /**收起键盘 */;
  onSure: () => void /**确认 */;
  onOverMax?: () => void /**超过最大值 */;
  onOverDigits?: () => void /**超过小数点前最大位数 */;
}
const Keyboard: FC<IProps> = props => {
  const {
    value,
    visible,
    max = Infinity,
    digits = Infinity,
    onClose,
    onChange,
    onSure,
    onOverMax,
    onOverDigits,
  } = props;
  // state
  // const [innerValue, setInnerValue] = useState(value);
  // events
  const onItemTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const num = (event.target as HTMLDivElement).textContent as string;
    // 如果用户直接输入小数点，则在前面插入‘0’
    if (value.length === 0 && /^·$/.test(num)) {
      onChange('0.');
    } else {
      // 判断目前value值是否存在小数点做特殊处理
      if (/\./.test(value)) {
        // 有小数点
        if (+(value + num) >= max) {
          onOverMax && onOverMax();
        } else if (/^[0-9]$/.test(num) && value.split('.')[1].length < 2) {
          onChange(value + num);
        }
      } else {
        // 无小数点
        if (+(value + num) > max) {
          onOverMax && onOverMax();
        } else if (!/^·$/.test(num) && value.length >= digits) {
          onOverDigits && onOverDigits();
        } else if (/^·$/.test(num)) {
          if (+value >= max) {
            onOverMax && onOverMax();
          } else {
            onChange(value + '.');
          }
        } else if (/^[0-9]$/.test(num)) {
          onChange(value + num);
        }
      }
    }
    event.stopPropagation();
  };
  const onClear = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (value.length > 0) {
      onChange(value.slice(0, -1));
    }
    event.stopPropagation();
  };
  const onSureButtonTap = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    onSure();
    onClose();
    event.stopPropagation();
  };
  // effects
  useEffect(() => {
    const handler = () => {};
    document.body.addEventListener('touchstart', handler);
    return () => {
      document.body.removeEventListener('touchstart', handler);
    };
  }, []);

  // render
  return (
    <div
      className={`lg-keyboard noselect ${visible ? 'visible' : ''}`}
      onClick={() => onClose()}
    >
      <div className="lg-keyboard__contents ff-DIN-Bold">
        <div className="lg-keyboard__item" onClick={onItemTap}>
          1
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          2
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          3
        </div>
        <div className="lg-keyboard__item clear" onClick={onClear}></div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          4
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          5
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          6
        </div>
        <div className="lg-keyboard__item sure" onClick={onSureButtonTap}>
          确定
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          7
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          8
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          9
        </div>
        <div className="lg-keyboard__item zero" onClick={onItemTap}>
          0
        </div>
        <div className="lg-keyboard__item" onClick={onItemTap}>
          ·
        </div>
      </div>
    </div>
  );
};

export default memo(Keyboard);
