import Utils from '@/utils/utils';
import React, {
  useEffect,
  useState,
  memo,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from 'react';
import { history } from 'umi';
import './index.less';

interface IProps {
  title?: string;
  titleStyle?: CSSProperties;

  backgroundColor?: string;
  gradientColor?: string;
  fadeInTitle?: boolean /** 该属性需和gradientColor一起使用 */;

  theme?: 'dark' | 'light';
  type?: 'APP' | 'H5';

  rightButtonText?: string;

  renderRight?: () => JSX.Element;
  renderLeft?: () => JSX.Element;
  renderTitle?: () => JSX.Element;

  showBack?: boolean;
  showRefresh?: boolean;

  onBack?: () => void;
  onRefresh?: () => void;

  onRightButtonTap?: () => void;
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
    title,
    titleStyle,
    gradientColor,
    fadeInTitle,
    backgroundColor = gradientColor
      ? 'transparent'
      : 'linear-gradient(90deg, #FFD049 0%, #FFBA11 100%)',
    rightButtonText,
    showBack,
    showRefresh,
    theme = 'light',
    type = 'APP',
    onBack,
    onRightButtonTap,
    onRefresh,
    renderRight,
    renderLeft,
    renderTitle,
  } = props;

  useImperativeHandle(ref, () => ({
    height: headerRef.current
      ? headerRef.current.getBoundingClientRect().height
      : 0,
  }));

  // events
  const handleRightButtonTap = () => {
    onRightButtonTap && onRightButtonTap();
  };
  const handleRefreshButtonTap = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  const handleGoBackButtonTap = () => {
    if (onBack) {
      onBack();
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
      window && window.screen.height >= 812 && window.devicePixelRatio >= 2,
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
        />
      )}
      <div
        className="app-header__wrapper"
        style={{
          background: backgroundColor,
          color: theme === 'dark' ? '#333333' : '#FFFFFF',
          height: isBangScreen ? '88px' : '64px',
        }}
      >
        {/* 标题栏 */}
        <div className="app-header__titleBar">
          {/* 左侧按钮 */}
          <div className="app-header__leftButton">
            {showBack && (
              <div
                className={`app-header__backButton ${
                  type === 'APP' ? 'app' : 'h5'
                }`}
                style={{
                  background: `url(${
                    theme === 'dark'
                      ? require('./images/back_btn_dark.png')
                      : require('./images/back_btn_light.png')
                  }) no-repeat 0 center`,
                }}
                onClick={handleGoBackButtonTap}
              />
            )}
            {renderLeft && renderLeft()}
          </div>
          {/* 中间标题 */}
          <div
            className="app-header__title"
            style={{
              ...titleStyle,
              opacity: fadeInTitle ? opacity : 1,
            }}
          >
            {title}
            {renderTitle && renderTitle()}
          </div>
          {/* 右侧按钮 */}
          <div className="app-header__rightButton">
            {rightButtonText && (
              <span onClick={handleRightButtonTap}>{rightButtonText}</span>
            )}
            {showRefresh && (
              <div
                className={`app-header__refreshButton ${
                  type === 'APP' ? 'app' : 'h5'
                }`}
                style={{
                  background: `url(${
                    theme === 'dark'
                      ? require('./images/refresh_btn_dark.png')
                      : require('./images/refresh_btn_light.png')
                  }) no-repeat 100% center`,
                }}
                onClick={handleRefreshButtonTap}
              />
            )}

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
