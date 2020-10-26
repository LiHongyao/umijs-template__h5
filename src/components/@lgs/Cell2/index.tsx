import React, { CSSProperties, FC, memo } from 'react';
import './index.less';

interface IProps {
  cellStyle?: CSSProperties;

  icon?: string;
  title?: string;
  description?: string;
  value?: string;

  iconStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  valueStyle?: CSSProperties;

  titleCls?: string;
  descriptionCls?: string;
  valueCls?: string;

  underline?: boolean;
  underlineStyle?: CSSProperties;

  renderDescription?: () => JSX.Element;
  renderRight?: () => JSX.Element;
}

const Cell2: FC<IProps> = props => {
  const {
    cellStyle,

    icon,
    iconStyle,

    title,
    titleCls,
    titleStyle,

    description,
    descriptionCls,
    descriptionStyle,

    value,
    valueStyle,
    valueCls,

    underline,
    underlineStyle,

    renderRight,
    renderDescription,
  } = props;
  return (
    <div className="lg-cell2" style={cellStyle}>
      {/* 左侧图标 */}
      {icon && (
        <img src={icon} alt="" className="lg-cell2__icon" style={iconStyle} />
      )}
      {/* 中间内容 */}
      <div className="lg-cell2__content">
        {/* 顶部标题 */}
        <div className={`lg-cell2__title ${titleCls || ''}`} style={titleStyle}>
          {title}
        </div>
        {/* 底部描述 */}
        <div
          className={`lg-cell2__description ${descriptionCls || ''}`}
          style={descriptionStyle}
        >
          {description}
          {renderDescription && renderDescription()}
        </div>
      </div>
      {/* 右侧内容 */}
      <div className={`lg-cell2__right ${valueCls || ''}`} style={valueStyle}>
        {value && value}
        {renderRight && renderRight()}
      </div>
      {/* 装饰线 */}
      {underline && (
        <div className="lg-cell2__underline" style={{ ...underlineStyle }}></div>
      )}
    </div>
  );
};

export default memo(Cell2);
