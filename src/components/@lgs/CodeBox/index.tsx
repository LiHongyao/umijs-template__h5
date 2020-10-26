import React, { useState, useEffect  } from 'react';
import { useSetInterval } from '../../../hooks/index'
import Field from '../Field';
import './index.scss';
interface IProps {
  check: boolean,
  title?: string,
  onButtonTap?: () => void,
  onChange?: (value: string) => void
}

const COUNT_DOWN = 60;
const CodeBox: React.FC<IProps> = props => {
  // props
  const { title, check, onButtonTap, onChange } = props;
  // state
  const [delay, setDelay] = useState(null);
  const [count, setCount] = useState(COUNT_DOWN);

  useSetInterval(() => {
    if (count <= 1) {
      return () => {
        setDelay(null);
        setCount(COUNT_DOWN);
      };
    }
    setCount(count - 1);
  }, delay);

  const onTap = () => {
    onButtonTap && onButtonTap();
    
  }

  useEffect(() => {
    if(check) {
      setDelay(1000);
    }
  }, [check])

  // render
  return (
    <div className="lg-code">
      {/* 标题 */}
      {title && (
        <section className="lg-code__title">
           {title.split('').map(letter => (<span key={letter}>{letter}</span>))}
        </section>
      )}
      {/* 输入框 */}
      <Field placeHolder="请输入验证码" onChange={onChange}/>
      {/* 按钮 */}
      {count === COUNT_DOWN ? (
        <section className="lg-code__button" onClick={onTap}>获取验证码</section>
      ): (
        <section className="lg-code__button" >{count + 's后重新获取'}</section>
      )}
    </div>
  )
}

export default CodeBox;
