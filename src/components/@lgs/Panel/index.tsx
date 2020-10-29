import React, { CSSProperties, FC, memo } from 'react';
import './index.less';

interface IProps {
  visible: boolean;
  round?: boolean;
  children?: JSX.Element | JSX.Element[];
  customStyle?: CSSProperties;
  onClose?: () => void;
}

const Panel: FC<IProps> = props => {
  // props
  const { visible, round = true, children, customStyle, onClose } = props;
  // events
  const onMaskTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.persist();
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('lg-panel')) {
      onClose && onClose();
    }
  };
  // render
  return (
    <div
      className={`lg-panel ${visible ? 'visible' : 'outer'}`}
      onClick={onMaskTap}
    >
      <div
        className={`lg-panel__contents ${round ? 'round' : ''}`}
        style={customStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(Panel);
