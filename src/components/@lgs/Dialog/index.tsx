import React, { CSSProperties, FC, memo } from 'react'
import './index.less'
interface IProps {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  showCloseButton?: boolean;
  mask?: boolean;
  customStyle?: CSSProperties;
  onClose: () => void
}


const Dialog:FC<IProps> = props => {
  const {
    mask = true,
    showCloseButton = false,
    visible,
    children,
    customStyle,
    onClose
  } = props;

  // events
  const onTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.persist();
    const target = event.target as HTMLDivElement;
    if(mask && target.classList.contains('lg-dialog')) {
      onClose();
    }
  }
  // render
  return (
    <div className={`lg-dialog ${visible ? 'visible' : ''}`} onClick={onTap}>
      <div className="lg-dialog__content" style={{...customStyle}}>
        {children}
        {showCloseButton && <img src={require('./images/icon-close.png')} className="lg-dialog__close" onClick={onClose} />}
      </div>
    </div>
  )
}

export default memo(Dialog);
