import Bus from 'lg-bus';
import React, { FC, memo, useEffect, useState } from 'react';
import './Keyboard.less';

interface IToggleParams {
  visible: boolean;
  actionText: string;
}

let __TIME_OUT: any;
let __TIME_INTERVAL: any;

const Keyboard: FC = () => {
  const [visible, setVisible] = useState(false);
  const [actionText, setActionText] = useState('');

  useEffect(() => {
    Bus.$on('LG_KEYBOARD_TOGGLE_VISIBLE', (params: IToggleParams) => {
      setVisible(params.visible);
      setActionText(params.actionText);
    });
  }, []);

  // events
  const onItemTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const num = (event.target as HTMLDivElement).dataset.key as string;
    Bus.$emit('LG_KEYBOARD_INPUT', num);
    event.nativeEvent.stopImmediatePropagation();
  };
  const onSureButtonTap = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    Bus.$emit('LG_KEYBOARD_ACTION');
    event.nativeEvent.stopImmediatePropagation();
  };
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    __TIME_OUT = setTimeout(() => {
      __TIME_INTERVAL = setInterval(() => {
        Bus.$emit('LG_KEYBOARD_CLEAR');
      }, 100);
    }, 800);
    event.nativeEvent.stopImmediatePropagation();
  };
  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    Bus.$emit('LG_KEYBOARD_CLEAR');
    clearTimeout(__TIME_OUT);
    clearInterval(__TIME_INTERVAL);
    __TIME_INTERVAL = null;
    __TIME_OUT = null;
    event.nativeEvent.stopImmediatePropagation();
  };

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible]);
  useEffect(() => {
    const handler = (event: Event) => {
      // document事件触发时过滤指定元素（阻止键盘收起）
      let tar = event.target as HTMLElement;
      let tag = false;
      const reg = /(am-toast)/; /** 筛选条件 */
      while (tar.parentElement) {
        const s = JSON.stringify(
          [...Array.prototype.slice.call(tar.classList)].join('/'),
        );
        if (reg.test(s)) {
          tag = true;
          break;
        }
        tar = tar.parentElement;
      }
      if (!tag) {
        setVisible(false);
        Bus.$emit('LG_KEYBOARD_BLUR');
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  // render
  return (
    <div
      className={`lg-keyboard-wrapper ff-DIN-Bold noselect ${
        visible ? 'visible' : ''
      }`}
    >
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="1" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="2" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="3" />
      <div
        className="lg-keyboard__item clear"
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="4" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="5" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="6" />
      <div
        className="lg-keyboard__item sure"
        onClick={onSureButtonTap}
        data-key={actionText}
      />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="7" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="8" />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="9" />
      <div
        className="lg-keyboard__item zero"
        onClick={onItemTap}
        data-key="0"
      />
      <div className="lg-keyboard__item" onClick={onItemTap} data-key="·" />
    </div>
  );
};

export default memo(Keyboard);
