import React, { FC, memo, useEffect, useRef, useState } from 'react';
import './index.less';

/** 组件属性接口 */
interface IProps {
  /** 拖拽元素 */
  children: JSX.Element | JSX.Element[];
  /** 拖拽元素初始位置 */
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /** 点击事件 */
  onTap?: () => void;
}

const DragView: FC<IProps> = (props) => {
  // 设置默认初始位置
  const { position = { right: 15, bottom: 80 } } = props;

  // refs
  const lgWrapper = useRef<HTMLDivElement | null>(null); /** 存储容器对象 */

  // states
  const [rect, setRect] = useState(() => ({
    width: 0,
    height: 0,
  })); /** 屏幕尺寸 */
  const [bounding, setBounding] = useState(() => ({
    x: 0,
    y: 0,
  })); /** 拖拽边界值 */
  const [pos, setPos] = useState(() => ({ x: 0, y: 0 })); /** 拖拽元素坐标 */

  // methods
  const calc = () => {
    // 获取屏幕的尺寸信息
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    if (lgWrapper.current) {
      // 获取容器元素的尺寸信息
      const _rect = lgWrapper.current.getBoundingClientRect();

      // 获取用户设置的位置信息
      const { top, right, bottom, left } = position;

      // 定义_pos记录临时坐标，默认在右下侧
      const _pos = {
        x: clientWidth - _rect.width,
        y: clientHeight - _rect.height,
      };

      // 单独判断并设置各方向的值
      if (top !== undefined) {
        _pos.y = top;
      }
      if (right !== undefined) {
        _pos.x = clientWidth - right - _rect.width;
      }
      if (bottom !== undefined) {
        _pos.y = clientHeight - bottom - _rect.height;
      }
      if (left !== undefined) {
        _pos.x = left;
      }

      // 同一方向，如果同时设置top、bottom值，则bottom值有效；
      if (top !== undefined && bottom !== undefined) {
        _pos.y = clientHeight - bottom - _rect.height;
      }

      // 同一方向，如果同时设置left、right值，则right值有效；
      if (left !== undefined && right !== undefined) {
        _pos.x = clientWidth - right - _rect.width;
      }

      // 更新拖拽元素位置
      setPos({ ..._pos });

      // 记录容器尺寸信息
      setRect(_rect);

      // 获取拖拽元素在屏幕内可拖拽的边界值
      setBounding({
        x: clientWidth - _rect.width,
        y: clientHeight - _rect.height,
      });
    }
  };
  // effects
  useEffect(() => {
    if (lgWrapper.current) {
      // 当组件一加载就计算初始位置信息
      calc();
    }
  }, [lgWrapper]);

  useEffect(() => {
    // 拖拽事件处理函数
    const onMove = (event: TouchEvent) => {
      // 获取触点
      const touch = event.touches[0];

      // 定位滑块的位置
      let x = touch.clientX - rect.width / 2;
      let y = touch.clientY - rect.height / 2;

      // 处理边界
      if (x < 0) {
        x = 0;
      } else if (x > bounding.x) {
        x = bounding.x;
      }
      if (y < 0) {
        y = 0;
      } else if (y > bounding.y) {
        y = bounding.y;
      }

      // 更新拖拽视图位置
      setPos({ x, y });

      // 阻止默认行为
      event.preventDefault();

      // 阻止事件冒泡
      event.stopPropagation();
    };

    // 监听拖拽事件
    if (lgWrapper.current) {
      lgWrapper.current.addEventListener('touchmove', onMove, {
        passive: false,
      });
    }
    // 移除拖拽事件
    return () => {
      if (lgWrapper.current)
        lgWrapper.current.removeEventListener('touchmove', onMove);
    };
  }, [lgWrapper, bounding, rect]);

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
        if (props.onTap) props.onTap();
      }}
    >
      {props.children}
    </div>
  );
};

export default memo(DragView);
