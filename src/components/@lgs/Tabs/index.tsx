import React, {
  CSSProperties,
  forwardRef,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import './index.less';

export interface TabsItem {
  title: string;
  badge?: number;
}

interface IProps {
  menus: TabsItem[];
  current: number;
  children?: JSX.Element | JSX.Element[];

  sticky?: boolean;

  underline?: boolean;
  underlineStyle?: CSSProperties;

  itemStyle?: CSSProperties;
  cursorStyle?: CSSProperties;

  onChange: (index: number) => void;
}
type ScrollElement = HTMLElement | Window;
interface IRefs {}

const Tabs = forwardRef<IRefs, IProps>((props, ref) => {
  const {
    menus,
    current = 0,
    children,
    cursorStyle,
    itemStyle,
    underline,
    underlineStyle,
    sticky,
    onChange,
  } = props;

  const [isOverbrim, setIsOverbrim] = useState(false);
  const [cursorPos, setCursorPos] = useState<number[]>([]);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  // refs
  const menuRef = useRef<HTMLDivElement>(null);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLElement[]>([]);
  const cursorRef = useRef<HTMLElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);

  // methods
  const getScroller = (el: HTMLElement, root: ScrollElement = window) => {
    let node = el;
    const overflowScrollReg = /scroll|auto/i;
    while (
      node &&
      node.tagName !== 'HTML' &&
      node.nodeType === 1 &&
      node !== root
    ) {
      const { overflowY } = window.getComputedStyle(node);

      if (overflowScrollReg.test(overflowY)) {
        if (node.tagName !== 'BODY') {
          return node;
        }

        const { overflowY: htmlOverflowY } = window.getComputedStyle(
          node.parentNode as Element,
        );

        if (overflowScrollReg.test(htmlOverflowY)) {
          return node;
        }
      }
      node = node.parentNode as HTMLElement;
    }

    return root;
  };

  // events
  const onMenuItemTap = (index: number) => {
    if (current === index) return;
    onChange(index);
    let dom = menuItemsRef.current[index];
    let itemLeft = dom.offsetLeft;
    let itemHalf = dom.offsetWidth / 2;
    let menuHalf = menuRef.current!.offsetWidth / 2;
    let target = itemLeft - menuHalf + itemHalf;
    if (target < 0) {
      target = 0;
    }
    if (
      target >
      menuWrapperRef.current!.offsetWidth - menuRef.current!.offsetWidth
    ) {
      target =
        menuWrapperRef.current!.offsetWidth - menuRef.current!.offsetWidth - 1;
    }
    // 帧动画

    let minus = target - menuRef.current!.scrollLeft;
    let duration = 250;
    let interval = 12;
    let speed = minus / (duration / interval);
    let timer = setInterval(() => {
      menuRef.current!.scrollLeft += speed;
      if (
        Math.abs(target - menuRef.current!.scrollLeft) <= Math.abs(speed) ||
        Math.abs(speed) < 1
      ) {
        console.log('清除定时器');
        menuRef.current!.scrollLeft = target;
        clearInterval(timer);
      }
    }, interval);
  };

  // effects
  // => 判断内容是否溢出屏幕
  useEffect(() => {
    let menuWidth = menuRef.current?.getBoundingClientRect().width;
    let menuWrapperWidth = menuWrapperRef.current?.getBoundingClientRect()
      .width;
    menuWidth &&
      menuWrapperWidth &&
      setIsOverbrim(menuWrapperWidth > menuWidth);
  }, [menuRef, menuWrapperRef]);
  // => 计算游标位置
  useEffect(() => {
    if (menuItemsRef.current && cursorRef.current) {
      const cursorHalf = cursorRef.current.getBoundingClientRect().width / 2;
      const pos: number[] = [];
      menuItemsRef.current.forEach((dom, i) => {
        let { left, width } = dom.getBoundingClientRect();
        pos.push(left + width / 2 - cursorHalf);
      });
      setCursorPos(pos);
    }
  }, [menuItemsRef.current, cursorRef.current]);
  // => 吸顶
  useEffect(() => {
    let parent: ScrollElement | null = null;
    const onScroll = (e: Event) => {
      // @ts-ignore
      let scrollTop = +e.target?.scrollTop;
      if (scrollTop > tabsWrapperRef.current!.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    if (sticky && tabsWrapperRef.current) {
      parent = getScroller(tabsWrapperRef.current);
      console.log(parent);
      parent.addEventListener('scroll', onScroll, false);
    }
    return () => {
      if (parent) {
        parent.removeEventListener('scroll', onScroll, false);
      }
    };
  }, [tabsWrapperRef]);

  // render
  return (
    <div ref={tabsWrapperRef} className="lg-tabs">
      {menuRef && isSticky && (
        <div
          className="lg-tabs__menu"
          style={{
            width: tabsWrapperRef.current?.offsetWidth,
            height: tabsWrapperRef.current?.offsetHeight,
          }}
        ></div>
      )}
      {/* 菜单 */}
      <div
        className={`lg-tabs__menu ${isSticky ? 'lg-tabs__menu_fiexd' : ''}`}
        ref={menuRef}
      >
        <div
          className="lg-tabs__menu_wrapper"
          ref={menuWrapperRef}
          style={{
            justifyContent: isOverbrim ? 'flex-start' : 'space-around',
          }}
        >
          {menus.map((item, i) => (
            <section
              ref={(dom: HTMLElement) => menuItemsRef.current.push(dom)}
              className="lg-tabs__menu_item"
              style={{ ...itemStyle }}
              key={`tabs_menu_item_${i}`}
              onClick={() => {
                onMenuItemTap(i);
              }}
            >
              {item.title}
              {item.badge && (
                <span
                  className="lg-tabs_menu_badge"
                  style={{
                    fontSize:
                      item.badge > 9
                        ? item.badge > 99
                          ? '14px'
                          : '16px'
                        : '18px',
                  }}
                >
                  {(() => {
                    return item.badge > 99 ? '99+' : item.badge;
                  })()}
                </span>
              )}
            </section>
          ))}
          <section
            ref={cursorRef}
            className="lg-tabs__cursor"
            style={{
              transform: `translateX(${cursorPos[current]}px)`,
              ...cursorStyle,
            }}
          ></section>
        </div>
        {/* 装饰线 */}
        {underline && (
          <div
            className="lg-tabs_underline"
            style={{ ...underlineStyle }}
          ></div>
        )}
      </div>
      {/* 内容 */}
      {children && <div className="lg-tabs__content">{children}</div>}
    </div>
  );
});

export default memo(Tabs);
