import React, {
  memo,
  FormEvent,
  CSSProperties,
  useRef,
  useEffect,
} from 'react';
import './index.less';

interface IProps {
  value: string | number;
  placeHolder?: string;
  type?: 'text' | 'password' | 'number' | 'tel';
  clear?: boolean;
  disabled?: boolean;
  focus?: boolean /** 是否获取焦点（手动控制） */;

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
    type = 'text',
    fontSize = '13px',
    color = '#333333',
    placeHolderColor = '#A8A8A8',
    clear = true,
    maxLength = Infinity,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  // events
  const _onChange = (event: FormEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.currentTarget.value;
    if (props.rule && !props.rule.test(value)) {
      return;
    }
    props.onChange(value);
  };
  const _onClear = () => {
    props.onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  // 监听
  useEffect(() => {
    if (props.focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.focus, inputRef]);

  // render
  return (
    <>
      <div
        className={`lg-field ${props.customCls || ''}`}
        style={props.fieldStyle}
      >
        <input
          ref={inputRef}
          className="lg-field__control"
          placeholder={props.placeHolder}
          type={type}
          value={props.value}
          onChange={_onChange}
          maxLength={maxLength}
          disabled={!!props.disabled}
          style={{
            // @ts-ignore
            '--placeholder-color': placeHolderColor,
            '--size': fontSize,
            color,
            ...props.controlStyle,
          }}
        />
        {clear && !props.disabled && String(props.value).length > 0 && (
          <img
            className="lg-field__clear"
            src={require('./images/icon_clear.png')}
            onClick={_onClear}
            alt=""
          />
        )}
      </div>
      {props.underline && (
        <div className="lg-field__underline" style={props.underlineStyle}></div>
      )}
    </>
  );
};

export default memo(Field);
