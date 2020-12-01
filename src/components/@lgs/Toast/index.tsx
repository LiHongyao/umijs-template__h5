import classNames from 'lg-classnames';
import React from 'react';
import ReactDom from 'react-dom';
import './index.less';

interface Iconfigs {
  message?: string;
  duration?: number;
  type: 'loading' | 'info';
}

let __toast_timer: any;
const getToast = (props: { message?: string; loading: boolean }) => {
  return (
    <div className="lg-toast__wrapper">
      <div
        className={classNames([
          'lg-toast__content',
          { loading: props.loading },
        ])}
      >
        {props.loading && (
          <img
            src={require('./images/loading.png')}
            alt=""
            className="lg-toast__loading"
          />
        )}
        {props.message && <div className="lg-toast__tips">{props.message}</div>}
      </div>
    </div>
  );
};

const getWrap = () => {
  let wrap = document.querySelector('.lg-toast');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.setAttribute('class', 'lg-toast');
    document.body.appendChild(wrap);
  }
  let child = wrap.querySelector('lg-toast__box');
  if (child) {
    child.remove();
  }
  return wrap;
};

const render = (configs: Iconfigs) => {
  clearTimeout(__toast_timer);
  let wrap = getWrap();
  ReactDom.render(
    getToast({
      message: configs.message,
      loading: configs.type === 'loading',
    }),
    wrap,
  );
  if (configs.duration) {
    __toast_timer = setTimeout(() => {
      ReactDom.unmountComponentAtNode(wrap);
      clearTimeout(__toast_timer);
    }, configs.duration * 1000);
  }
};

const info = (message: string, duration: number = 1.5) => {
  render({ message, duration, type: 'info' });
};
const loading = (message?: string) => {
  render({ message, type: 'loading' });
};
const hide = () => {
  let wrap = getWrap();
  ReactDom.unmountComponentAtNode(wrap);
};

export default {
  info,
  loading,
  hide,
};
