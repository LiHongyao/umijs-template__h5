import classNames from 'lg-classnames';
import React, { memo, useState, useEffect, CSSProperties } from 'react';
import './index.less';

interface IProps {
  src: string /** 图片地址 */;
  defaultImage?: any /** 默认显示 */;
  round?: boolean /** 是否呈现原型 */;
  alt?: string /** alt属性 */;
  type?: 'bg' | 'img' /** 类型 */;
  customCls?: string /** 自定义class */;
  style?: CSSProperties /** 自定义样式 */;
  onTap?: () => void /** 监听点击 */;
}
const _Image: React.FC<IProps> = (props) => {
  const { type = 'img' } = props;

  const [innerSrc, setInnerSrc] = useState(props.defaultImage);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      if (image.width > 1) {
        setInnerSrc(props.src);
      }
    };
    image.src = props.src;
  }, [props.src]);

  return type === 'img' ? (
    // img呈现
    <img
      className={classNames(['lg-image', props.customCls])}
      style={props.style}
      src={innerSrc}
      alt={props.alt}
      onClick={() => {
        if (props.onTap) props.onTap();
      }}
    />
  ) : (
    // bg呈现
    <div
      className={classNames([
        'lg-image-bg',
        props.customCls,
        { round: props.round },
      ])}
      style={{
        background: `url(${innerSrc}) no-repeat center center / cover`,
        ...props.style,
      }}
      onClick={() => {
        if (props.onTap) props.onTap();
      }}
    />
  );
};

export default memo(_Image);
