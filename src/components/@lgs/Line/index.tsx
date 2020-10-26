import React, { FC, memo } from 'react';
import './index.less';

interface IProps {
  width?: string;
  color?: string;
  height?: string;
  customCls?: string;
}
const Line: FC<IProps> = props => {
  const {
    width = '100%',
    height = '1px',
    color = '#DEDEDE',
    customCls = '',
  } = props;
  return (
    <div
      className={`lg-line ${customCls}`}
      style={{
        width,
        height,
        backgroundColor: color,
      }}
    />
  );
};

export default memo(Line);
