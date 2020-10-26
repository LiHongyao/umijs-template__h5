import { useEffect, useRef } from 'react';

type CBType = () => Function | undefined;

function useSetInterval(cb: CBType, delay: number = 1000) {
  const cbRef = useRef<CBType>();

  // 缓存函数
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);
  // 定时器
  useEffect(() => {
    let timer = setInterval(() => {
      let clearFn = cbRef.current && cbRef.current();
      if (clearFn) {
        clearFn();
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [delay, cbRef]);
}

export default useSetInterval;
