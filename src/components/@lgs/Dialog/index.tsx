import classNames from 'lg-classnames';
import React, { CSSProperties, FC, memo, useEffect, useRef } from 'react';
import './index.less';
interface IProps {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  showCloseButton?: boolean;
  mask?: boolean;
  customStyle?: CSSProperties;
  closeButtonPosition?: 'default' | 'bottom';
  onClose: () => void;
}

const Dialog: FC<IProps> = (props) => {
  const {
    mask = true,
    showCloseButton = false,
    closeButtonPosition = 'default',
  } = props;

  const lgWrapper = useRef<HTMLDivElement | null>(null);

  // events
  const onTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    if (mask && target.classList.contains('lg-dialog')) {
      props.onClose();
    }
  };
  // effects
  useEffect(() => {
    document.body.style.overflow = props.visible ? 'hidden' : 'auto';
  }, [props.visible]);
  // render
  return (
    <div
      ref={lgWrapper}
      className={`lg-dialog ${props.visible ? 'visible' : ''}`}
      onClick={onTap}
    >
      <div className="lg-dialog__content" style={{ ...props.customStyle }}>
        {props.children}
        {showCloseButton && (
          <img
            src={require('./images/icon-close.png')}
            className={classNames([
              'lg-dialog__close',
              {
                bottom: closeButtonPosition === 'bottom',
              },
            ])}
            onClick={props.onClose}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Dialog);
