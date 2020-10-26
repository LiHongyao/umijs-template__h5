import React from 'react'
import './index.scss'

interface IProps {
  text: string
}
const Title: React.FC<IProps> = props => {
  const { text } = props;
  return (
    <div className="justify-view__wrapper">
      {text.split('').map(letter => (<span key={letter}>{letter}</span>))}
    </div >
  )
}

export default React.memo(Title);
