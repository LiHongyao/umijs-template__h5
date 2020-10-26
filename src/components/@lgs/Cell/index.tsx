import React, { CSSProperties, memo } from "react";
import "./index.less";

interface IProps {
  children?: JSX.Element | JSX.Element[];

  cellStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  valueStyle?: CSSProperties;
  underlineStyle?: CSSProperties;

  title?: string;
  value?: string | number;

  underline?: boolean;


  isLink?: boolean;
  renderRight?: () => JSX.Element;

  required?: boolean;

  customCls?: string;
  valueCls?: string;
}
const Cell: React.FC<IProps> = (props) => {
  const { 
    title, 
    titleStyle,
    value, 
    isLink, 
    customCls, 
    valueCls, 
    required,
    cellStyle,
    valueStyle,
    renderRight,
    underline,
    underlineStyle
  } = props;
  return (
    <div 
      className={`lg-cell ${customCls || ''}`} 
      style={cellStyle}
    >
      {/* 左边文字 */}
      <div 
        className={`lg-cell__title ${required ? 'required' : ''}`}
        style={{...titleStyle}}
      >
        {title && title.split("").map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
      {/* 内容 */}
      {/* @ts-ignore */}
      <div className={`lg-cell__value ${valueCls || ''}`} style={{color: '#828282', ...valueStyle}}>
        { value && value}
        { props.children && props.children}
      </div>
      {/* 右侧图标 */}
      <div className="lg-cell__right">
        {isLink && <img src={require('./images/icon_arrow_right.png')} alt="" className="link" />}
        {renderRight && renderRight()}
      </div>

      {/* 装饰线 */}
      {underline && <div className="lg-cell__underline" style={{...underlineStyle}}></div>}
      
    </div>
  );
};

export default memo(Cell);
