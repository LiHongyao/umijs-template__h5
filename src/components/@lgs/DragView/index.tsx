import React, { FC, memo, useEffect, useRef, useState } from 'react';
import './index.less';

interface IProps {
  children: JSX.Element | JSX.Element[] /** 拖拽元素 */;
  position: [
    number,
    number,
    number,
    number,
  ] /** 拖拽元素初始位置：[上, 右, 下, 左] */;
  onTap?: () => void /** 点击事件 */;
}
const DragView: FC<IProps> = props => {
  // refs
  const lgWrapper = useRef<HTMLDivElement | null>(null);
  // states
  const [rect, setRect] = useState(() => ({ width: 0, height: 0 }));
  const [offset, setOffset] = useState(() => ({ x: 0, y: 0 }));
  const [pos, setPos] = useState(() => ({ x: 0, y: 0 }));

  // methods
  const calc = () => {
    // 1. 获取屏幕的尺寸信息
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;
    // 2. 获取容器元素的尺寸信息
    // @ts-ignore
    const rect = lgWrapper.current.getBoundingClientRect();
    // 3. 获取用户设置的位置信息
    const [top, right, bottom, left] = props.position;
    setPos({ x: left, y: top });
    if (right) {
      setPos(prevState => ({
        ...prevState,
        x: clientWidth - right - rect.width,
      }));
    }
    if (bottom) {
      setPos(prevState => ({
        ...prevState,
        y: clientHeight - bottom - rect.height,
      }));
    }
    // 4. 记录容器尺寸信息
    setRect(rect);
    // 5. 获取拖拽元素在屏幕内可拖拽的边界值
    setOffset({
      x: clientWidth - rect.width,
      y: clientHeight - rect.height,
    });
  };
  // effects
  useEffect(() => {
    if (lgWrapper.current) {
      calc();
    }
  }, [lgWrapper]);

  useEffect(() => {
    window.addEventListener('resize', calc);
    return () => {
      window.removeEventListener('resize', calc);
    };
  }, []);
  useEffect(() => {
    const onMove = (event: TouchEvent) => {
      // 获取触点，兼容PC和移动端
      let touch = event.touches[0];
      // 定位滑块的位置
      let x = touch.clientX - rect.width / 2;
      let y = touch.clientY - rect.height / 2;
      // 处理边界
      if (x < 0) {
        x = 0;
      } else if (x > offset.x) {
        x = offset.x;
      }
      if (y < 0) {
        y = 0;
      } else if (y > offset.y) {
        y = offset.y;
      }
      setPos({ x, y });
      event.preventDefault();
    };

    if (lgWrapper.current) {
      lgWrapper.current.addEventListener('touchmove', onMove, {
        passive: false,
      });
    }
    return () => {
      lgWrapper.current &&
        lgWrapper.current.removeEventListener('touchmove', onMove);
    };
  }, [lgWrapper, offset, rect]);

  // render
  return (
    <div
      ref={lgWrapper}
      className="lg-drag-view"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
      onClick={() => {
        props.onTap && props.onTap();
      }}
    >
      {props.children}
    </div>
  );
}; /*  */

export default memo(DragView);
