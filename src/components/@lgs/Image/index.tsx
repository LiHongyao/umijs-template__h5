import React, { memo, useState, useEffect } from 'react'

interface IProps {
  className?: string
  src: string
}
const _Image: React.FC<IProps> = props => {
  const { src, className } = props;
  const [imgSrc, setImgSrc] = useState('http://www.shuoshuokong.com/d/file/2019-01/8481e48f8586fd81214f07659818eec1.jpg');

  useEffect(() => {
    const image = new Image();
    image.onload = function() {
      if(image.width > 1) {
        setImgSrc(src);
      }
    }
    image.src = src;
  }, [src]); 

  return (
    <img className={className} src={imgSrc} alt=""/>
  )
} 


export default memo(_Image);
