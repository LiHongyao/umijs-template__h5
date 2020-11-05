import React, { CSSProperties, FC, memo, useEffect, useRef } from 'react';
import './index.less';
interface IProps {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  showCloseButton?: boolean;
  mask?: boolean;
  customStyle?: CSSProperties;
  onClose: () => void;
}

const Dialog: FC<IProps> = props => {
  const {
    mask = true,
    showCloseButton = false,
    visible,
    children,
    customStyle,
    onClose,
  } = props;

  const lgWrapper = useRef<HTMLDivElement | null>(null);

  // events
  const onTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    if (mask && target.classList.contains('lg-dialog')) {
      onClose();
    }
  };
  // effects
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible]);
  // render
  return (
    <div
      ref={lgWrapper}
      className={`lg-dialog ${visible ? 'visible' : ''}`}
      onClick={onTap}
    >
      <div className="lg-dialog__content" style={{ ...customStyle }}>
        {children}
        {showCloseButton && (
          <img
            src={require('./images/icon-close.png')}
            className="lg-dialog__close"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Dialog);
