import React from 'react';
import ReactDom from 'react-dom';
import Message, { IConfigs } from './Message';
import './index.less';

const renderWrap = () => {
  let wrap = document.querySelector('.lg-message');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.setAttribute('class', 'lg-message');
    document.body.appendChild(wrap);
  }
  return wrap as HTMLElement;
};

const info = (options: IConfigs | string) => {
  if (typeof options === 'string') {
    options = { message: options };
  }
  let wrap = renderWrap();
  let divs = document.createElement('div');
  divs.setAttribute('class', 'lg-message__wrapper');
  wrap.appendChild(divs);
  ReactDom.render(
    <Message rootDom={wrap} parentDom={divs} config={options} />,
    divs,
  );
};

export default {
  info,
};
