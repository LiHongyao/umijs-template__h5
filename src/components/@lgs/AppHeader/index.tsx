import jsBridge from '@/utils/jsBridge';
import Utils from '@/utils/utils';
import React, {
  useEffect,
  useState,
  memo,
  useImperativeHandle,
  useRef,
} from 'react';
import { history } from 'umi';
import './index.less';

interface IProps {
  title?: string;
  backgroundColor?: string;
  gradientColor?: string;
  theme?: 'dark' | 'light';
  type?: 'APP' | 'H5';

  rightButtonText?: string;
  renderRight?: () => JSX.Element;

  showLeftButton?: boolean;
  renderLeft?: () => JSX.Element;

  onRightButtonClick?: () => void;
  onLeftButtonTap?: () => void;
}

interface IRefs {
  height: number;
}

const AppHeader = React.forwardRef<IRefs, IProps>((props, ref) => {
  // state
  const [opacity, setOpacity] = useState(0);
  const [isBangScreen, setIsBangScreen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const {
    title = '标题',
    gradientColor,
    backgroundColor = gradientColor
      ? 'transparent'
      : 'linear-gradient(to right, #FFD24D, #FFB80D)',
    rightButtonText,
    showLeftButton,
    theme = 'light',
    type = 'APP',
    onLeftButtonTap,
    onRightButtonClick,
    renderRight,
    renderLeft,
  } = props;

  useImperativeHandle(ref, () => ({
    height: headerRef.current
      ? headerRef.current.getBoundingClientRect().height
      : 0,
  }));

  // events
  const handleRightButtonTap = () => {
    onRightButtonClick && onRightButtonClick();
  };
  const handleGoBackButtonTap = () => {
    if (onLeftButtonTap) {
      onLeftButtonTap();
    } else if (Utils.query('appBack') === '1') {
      jsBridge.goBack();
    } else {
      history.goBack();
    }
  };
  const handlePageScroll = (ev: Event) => {
    ev = ev || window.event;
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    let target = 100;
    if (scrollTop < target) {
      setOpacity(scrollTop / target);
    } else {
      setOpacity(1);
    }
  };
  // effects
  useEffect(() => {
    setIsBangScreen(
      window &&
        /iPhone/i.test(window.navigator.userAgent) &&
        window.screen.height >= 812 &&
        window.devicePixelRatio >= 2,
    );
  }, []);
  useEffect(() => {
    if (!gradientColor) return;
    window.addEventListener('scroll', handlePageScroll, false);
    return () => {
      window.removeEventListener('scroll', handlePageScroll, false);
    };
  }, [gradientColor]);
  // render
  return (
    <div ref={headerRef} className="app-header">
      {/* 占位元素 */}
      {!gradientColor && backgroundColor !== 'transparent' && (
        <div
          className="app-header__place"
          style={{ height: isBangScreen ? '88px' : '64px' }}
        ></div>
      )}
      <div
        className="app-header__wrapper"
        style={{
          background: backgroundColor,
          color: theme === 'dark' ? '#000000' : '#FFFFFF',
          height: isBangScreen ? '88px' : '64px',
        }}
      >
        {/* 自定义视图 */}
        <div className="app-header__titleBar">
          {/* 左侧按钮 */}
          <div
            className="app-header__leftButton"
            onClick={handleGoBackButtonTap}
          >
            {showLeftButton && (
              <div
                className={`app-header__backButton ${type === 'APP' ? 'app' : 'h5'}`}
                style={{
                  background: `url(${
                    theme === 'dark'
                      ? require('./images/back_btn_dark.png')
                      : require('./images/back_btn_light.png')
                  }) no-repeat 0 center`,
                }}
              />
            )}
            {renderLeft && renderLeft()}
          </div>
          {/* 中间标题 */}
          <div className="app-header__title">{title}</div>
          {/* 右侧按钮 */}
          <div className="app-header__rightButton">
            <span onClick={handleRightButtonTap}>{rightButtonText}</span>
            {renderRight && renderRight()}
          </div>
        </div>
        {/* 渐变层 */}
        {gradientColor && (
          <div
            className="app-header__mask"
            style={{ background: gradientColor, opacity }}
          />
        )}
      </div>
    </div>
  );
});

export default memo(AppHeader);