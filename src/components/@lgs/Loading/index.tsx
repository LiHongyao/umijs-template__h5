import React, { memo } from 'react'
import './index.scss'


interface IProps {
  top?: number,
  size?: number
}
const Loading: React.FC<IProps> = props => {
  const { top = 150, size = 35} = props;
  return (
    <div className="lg-loading" style={{paddingTop: top + 'px'}}>
      <img className="lg-loading__img" src={require('./images/loading.png')} style={{width: size + 'px', height: size + 'px'}} alt=""/>
    </div>
  )
}

export default memo(Loading);