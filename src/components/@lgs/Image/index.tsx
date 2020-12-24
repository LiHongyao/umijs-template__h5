import React, { memo, useState, useEffect, CSSProperties } from 'react';
import './index.less';

interface IProps {
  src: string;
  alt: string;
  defaultImage?: any;
  customCls?: string;
  style?: CSSProperties;
  onTap?: () => void;
}
const _Image: React.FC<IProps> = (props) => {
  const { src, customCls, style, defaultImage, alt } = props;
  const [innerSrc, setInnerSrc] = useState(defaultImage);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      if (image.width > 1) {
        setInnerSrc(src);
      }
    };
    image.src = src;
  }, [src]);

  return (
    <img
      className={`lg-image ${customCls || ''}`}
      style={style}
      src={innerSrc}
      alt={alt}
      onClick={() => {
        if (props.onTap) props.onTap();
      }}
    />
  );
};

export default memo(_Image);
