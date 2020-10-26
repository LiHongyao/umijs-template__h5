import React, {
  useState,
  useEffect,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './index.less';

interface IProps {
  menus: string[];
  children?: React.ReactElement[];
  menuHeight?: string;
  menuBackgroundColor?: string;
  current?: number;
  barHeight?: string;
  onMenuItemTap?: (index: number) => void;
}

interface IRefs {
  height: number;
}

const TabMenu: React.ForwardRefRenderFunction<IRefs, IProps> = (props, ref) => {
  // props
  const {
    current = 0,
    menus,
    menuHeight = '50px',
    menuBackgroundColor = '#FFFFFF',
    barHeight = '0',
    children,
  } = props;
  const { onMenuItemTap } = props;
  // state
  const [selectIndex, setSelectIndex] = useState<number | undefined>(current);
  const [lastSelectIndex, setLastSelectIndex] = useState<number | undefined>(
    current,
  );
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [bar, setBar] = useState<React.ReactElement | null>(null);
  const [contents, setContents] = useState<React.ReactElement[]>([]);

  // refs
  const menuRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => {
    let rootHeight = document.documentElement.getBoundingClientRect().height;
    let menuHeight = menuRef.current!.getBoundingClientRect().height;
    let barHeight = barRef.current!.getBoundingClientRect().height;
    return {
      height: rootHeight - menuHeight - barHeight,
    };
  });

  // events
  const _onMenuItemTap = (index: number) => {
    if (lastSelectIndex === index) return;
    contentRef.current!.children[lastSelectIndex!].scrollTop = 0;
    setTimeout(() => {
      setSelectIndex(index);
      onMenuItemTap && onMenuItemTap(index);
      setLastSelectIndex(index);
    }, 0);
  };
  // effects
  useEffect(() => {
    let rootHeight = document.documentElement.getBoundingClientRect().height;
    let menuHeight = menuRef.current!.getBoundingClientRect().height;
    let barHeight = barRef.current!.getBoundingClientRect().height;
    setContentHeight(rootHeight - menuHeight - barHeight);
  }, [menuHeight]);

  useEffect(() => {
    if (children && children[0]) {
      setBar(barHeight === '0' ? null : children[0]);
      setContents(barHeight === '0' ? children : children.slice(1));
    }
  }, [barHeight, children]);

  // render
  return (
    <div className="lhy-tabmenu">
      {/* 标题栏 */}
      <div
        className="lhy-tabmenu__menus"
        ref={menuRef}
        style={{ background: menuBackgroundColor, height: menuHeight }}
      >
        {menus.map((menu, index) => (
          <div
            className={`menu-item ${selectIndex === index ? 'selected' : ''}`}
            key={index}
            onClick={() => {
              _onMenuItemTap(index);
            }}
          >
            {menu}
          </div>
        ))}
      </div>
      {/* bar */}
      <div
        className="lhy-tabmenu_bar"
        style={{ height: barHeight }}
        ref={barRef}
      >
        {bar}
      </div>
      {/* 内容 */}
      <div
        className="lhy-tabmenu__contents"
        style={{ height: `${contentHeight}px` }}
        ref={contentRef}
      >
        {contents &&
          contents.map((item, index) => (
            <div
              className={`content-item ${selectIndex === index ? 'show' : ''}`}
              key={index}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(forwardRef(TabMenu));
