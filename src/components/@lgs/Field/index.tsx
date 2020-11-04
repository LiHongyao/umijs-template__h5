import React, { memo, FormEvent, CSSProperties } from 'react';
import './index.less';

interface IProps {
  value: string | number;
  placeHolder?: string;
  type?: 'text' | 'password' | 'number' | 'tel';
  clear?: boolean;
  disabled?: boolean;

  underline?: boolean;
  underlineStyle?: CSSProperties;

  /* 根节点样式 */
  fieldStyle?: CSSProperties;
  /* input样式 */
  controlStyle?: CSSProperties;

  fontSize?: string;
  color?: string;
  placeHolderColor?: string;

  maxLength?: number;
  customCls?: string;
  bold?: boolean;
  /* 校验规则/校验未通过不触发onChange回显*/
  rule?: RegExp;

  onChange: (value: string) => void;
}

const Field: React.FC<IProps> = props => {
  const {
    value = '',
    placeHolder,
    type = 'text',
    fieldStyle,
    controlStyle,
    fontSize = '13px',
    color = '#333333',
    placeHolderColor = '#A8A8A8',
    clear = true,
    customCls = '',
    maxLength = Infinity,
    rule = new RegExp(''),
    disabled = false,
    underline,
    underlineStyle,
  } = props;

  const { onChange } = props;

  const _onChange = (event: FormEvent<HTMLInputElement>) => {
    event.persist();
    let value = event.currentTarget.value;
    rule.test(value) && onChange(value);
  };
  const _onClear = () => {
    onChange('');
  };

  return (
    <>
      <div className={`lg-field ${customCls}`} style={fieldStyle}>
        <input
          className="lg-field__control"
          placeholder={placeHolder}
          type={type}
          value={value}
          onChange={_onChange}
          maxLength={maxLength}
          disabled={disabled}
          style={{
            // @ts-ignore
            '--placeholder-color': placeHolderColor,
            '--size': fontSize,
            color,
            ...controlStyle,
          }}
        />
        {clear && !disabled && String(value).length > 0 && (
          <img
            className="lg-field__clear"
            src={require('./images/icon_clear.png')}
            onClick={_onClear}
            alt=""
          />
        )}
      </div>
      {underline && (
        <div className="lg-field__underline" style={underlineStyle}></div>
      )}
    </>
  );
};

export default memo(Field);
