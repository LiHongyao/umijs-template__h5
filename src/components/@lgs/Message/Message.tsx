import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import ReactDom from 'react-dom';

export interface IConfigs {
  message: string;
  duration?: number;
  type?: string;
  render?: () => JSX.Element | JSX.Element[];
}

interface IProps {
  rootDom: HTMLElement; //这个用来干掉parentDom 这个可以常驻
  parentDom: HTMLElement; //这个是挂载点 要unmount卸载 完毕后卸载挂载点 注意！一共2步卸载，别漏了
  config: IConfigs;
}

const Message: FC<IProps> = props => {
  const {
    rootDom,
    parentDom,
    config: { message, duration = 2 },
  } = props;

  const unmount = useMemo(() => {
    return () => {
      if (parentDom && rootDom) {
        ReactDom.unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
      }
    };
  }, [parentDom, rootDom]);

  useEffect(() => {
    let t1 = setTimeout(() => {
      parentDom.classList.add('ani-out');
      let t2 = setTimeout(() => {
        unmount();
        clearTimeout(t2);
      }, 350);
      clearTimeout(t1);
    }, duration * 1000);
  }, [unmount]);

  return <div className="lg-message__item">{message}</div>;
};

export default Message;
