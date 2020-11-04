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
    onChange,
    onSearch,
  } = props;

  const _onChange = useCallback(
    (value: string) => {
      setKeyword(value);
      onChange && onChange(value);
    },
    [onChange],
  );
  const _onSearch = () => {
    onSearch && onSearch(keyword);
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
