import React, { memo, useState, useCallback, CSSProperties } from 'react';
import Field from '../Field/index';
import './index.scss';

interface IProps {
  value: string;
  fieldStyle?: CSSProperties;
  placeHolder?: string;
  backgroundColor?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}
const Search: React.FC<IProps> = props => {
  const [keyword, setKeyword] = useState('');
  const {
    value,
    placeHolder = '请输入搜搜关键字',
    backgroundColor = '#FFFFFF',
    fieldStyle,
    onSearch,
  } = props;

  const _onChange = useCallback(
    (v: string) => {
      setKeyword(v);
      if (props.onChange) props.onChange(v);
    },
    [props.onChange],
  );
  const _onSearch = () => {
    if (onSearch) onSearch(keyword);
  };

  return (
    <div className="lg-search" style={{ backgroundColor }}>
      <Field
        placeHolder={placeHolder}
        value={value}
        fieldStyle={fieldStyle}
        onChange={_onChange}
      />
      <section className="lg-search__buttton" onClick={_onSearch}>
        搜索
      </section>
    </div>
  );
};

export default memo(Search);
