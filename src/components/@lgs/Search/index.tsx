import React, { memo, useState, useCallback } from 'react'
import Field from '../Field/index'
import './index.scss'

interface IProps {
  round?: boolean,
  placeHolder?: string,
  backgroundColor?: string,
  onChange?:(value: string) => void,
  onSearch?:(value: string) => void
 
}
const Search: React.FC<IProps> = props => {
  const [keyword, setKeyword] = useState('');
  const { 
    round = false,
    placeHolder = '请输入搜搜关键字',
    backgroundColor = '#FFFFFF',
    onChange,
    onSearch
   } = props;

   const _onChange = useCallback((value: string) => {
      setKeyword(value);
      onChange && onChange(value);
   }, [onChange]);
   const _onSearch = () => {
    onSearch && onSearch(keyword);
   }

  return (
    <div className="lg-search" style={{backgroundColor}}>
      <Field placeHolder={placeHolder} backgroundColor="#F8F8F8" round={round} onChange={_onChange} />
      <section className="lg-search__buttton" onClick={_onSearch}>搜索</section>
    </div>
  )
}

export default memo(Search);
