import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './Keyboard';
import './index.less';
import Bus from 'lg-bus';

interface IProps {
  value: string;
  valueCls?: string;

  fontSize?: string;

  placeholder?: string;
  autoFocus?: boolean;
  digits?: number /** 小数点前的位数 */;
  max?: number /** 可输入的最大值 */;
  actionText?: string /** 确认按钮文字 */;
  align?: 'left' | 'center' | 'right' /** 对齐方式 */;
  clear?: boolean /** 是否显示清除按钮 */;

  onChange: (value: string) => void /** 数值变化 */;
  onAction?: () => void /** 点击确认按钮 */;
  onOverMax?: () => void /** 超过最大值 */;
  onOverDigits?: () => void /** 超过小数点前最大位数 */;
}

let HAS_AUTO_FOCUS: boolean = false;
const Input: FC<IProps> = props => {
  const {
    max = Infinity,
    digits = Infinity,
    actionText = '确认',
    align = 'left',
    clear = true,
  } = props;
  const [letters, setLetters] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);

  /** 渲染组件 */
  const renderKeyboard = () => {
    // 判断是否已经插入容键盘容器
    let container = document.getElementById('lg-keyboard');
    // 如果没有插入容器则创建容器并渲染键盘
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', 'lg-keyboard');
      document.body.append(container);
      ReactDOM.render(<Keyboard />, container);
    }
    // 判断初始化时是否自动获取焦点（优先第1个设置autoFocus为true的Input元素）
    if (props.autoFocus && !HAS_AUTO_FOCUS) {
      HAS_AUTO_FOCUS = true;
      const t = setTimeout(() => {
        Bus.$emit('LG_KEYBOARD_TOGGLE_VISIBLE', {
          visible: true,
          actionText,
        });
        setFocus(true);
        clearTimeout(t);
      }, 0);
    }
  };

  // events
  const onWrapperTap = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    Bus.$emit('LG_KEYBOARD_BLUR');
    setFocus(true);
    Bus.$emit('LG_KEYBOARD_TOGGLE_VISIBLE', { visible: true, actionText });
    event.nativeEvent.stopImmediatePropagation();
  };
  // effects
  /** 渲染键盘 */
  useEffect(() => {
    renderKeyboard();
  }, []);
  /** 事件监听 */
  useEffect(() => {
    // 1. 监听数字输入
    const change = (v: string) => {
      if (focus) {
        const _value = letters.join('');
        if (_value.length === 0 && /·/.test(v)) {
          // 如果用户直接输入小数点，则在前面插入‘0’
          props.onChange('0.');
        } else if (/^0$/.test(_value) && !/·/.test(v)) {
          // 如果第1位是0并且输入数字，则去除0返回数字
          props.onChange(v);
        } else {
          // 否则判断目前value值是否存在小数点做特殊处理
          if (/\./.test(_value)) {
            // 有小数点
            if (+(_value + v) >= max) {
              if (props.onOverMax) props.onOverMax();
            } else if (/^[0-9]$/.test(v) && _value.split('.')[1].length < 2) {
              props.onChange(_value + v);
            }
          } else {
            // 无小数点
            if (+(_value + v) > max) {
              if (props.onOverMax) props.onOverMax();
            } else if (!/^·$/.test(v) && _value.length >= digits) {
              if (props.onOverDigits) props.onOverDigits();
            } else if (/^·$/.test(v)) {
              if (+_value >= max) {
                if (props.onOverMax) props.onOverMax();
              } else {
                props.onChange(_value + '.');
              }
            } else if (/^[0-9]$/.test(v)) {
              props.onChange(_value + v);
            }
          }
        }
      }
    };
    Bus.$on('LG_KEYBOARD_INPUT', change);
    // 2. 监听清除
    const _clear = () => {
      if (letters.length > 0 && focus) {
        // 如果是0.x,当删除到x的时候直接删除所有
        const ch = letters[letters.length - 1];
        if (/^0\./.test(letters.join('')) && letters.lastIndexOf(ch) === 2) {
          props.onChange('');
        } else {
          props.onChange(letters.slice(0, -1).join(''));
        }
      }
    };
    Bus.$on('LG_KEYBOARD_CLEAR', _clear);
    // 3. 监听确认
    const sure = () => {
      if (focus) {
        if (props.onAction) props.onAction();
        setFocus(false);
        Bus.$emit('LG_KEYBOARD_TOGGLE_VISIBLE', {
          visible: false,
          actionText,
        });
      }
    };
    Bus.$on('LG_KEYBOARD_ACTION', sure);
    // 4. 监听失去焦点
    const blur = () => {
      if (focus) {
        setFocus(false);
      }
    };
    Bus.$on('LG_KEYBOARD_BLUR', blur);

    return () => {
      Bus.$off('LG_KEYBOARD_INPUT', change);
      Bus.$off('LG_KEYBOARD_CLEAR', _clear);
      Bus.$off('LG_KEYBOARD_ACTION', sure);
      Bus.$off('LG_KEYBOARD_BLUR', blur);
    };
  }, [letters, focus]);

  /** 监听value */
  useEffect(() => {
    setLetters(props.value.split(''));
  }, [props.value]);

  // render
  return (
    <div className="lg-input" onClick={onWrapperTap}>
      {/* 表单内容 */}
      <div className={`lg-input__wrapper __${align}`}>
        {letters.length > 0 && (
          <div
            className={`lg-input__value lg-input__cursor ${
              focus ? '__cursor' : ''
            } ${props.valueCls || ''}`}
            style={{ fontSize: props.fontSize }}
          >
            {letters.map((ch, i) => (
              <span className="lg-input__span" key={`lg-input__ch_${i}`}>
                {ch}
              </span>
            ))}
          </div>
        )}
        {/* 占位符 */}
        {letters.length === 0 && (
          <div
            className={`lg-input__placeholder lg-input__cursor  ${
              focus ? '__cursor' : ''
            } __${align}`}
            style={{ fontSize: props.fontSize }}
          >
            {props.placeholder}
          </div>
        )}
      </div>
      {/* 清除按钮 */}
      {clear && letters.length > 0 && focus && (
        <div
          className="lg-input__clear"
          onClick={() => {
            props.onChange('');
          }}
        ></div>
      )}
    </div>
  );
};

export default Input;
