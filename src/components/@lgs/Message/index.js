import React from 'react';
import ReactDom from 'react-dom';
import MessageBox from './MessageBox';

alert(1);

// 在真实 dom 中创建一个 div 节点，并且注入到 body 根结点中，该节点用来存放下面的 React 组件
const _messageWrapper = document.createElement('div');
document.body.appendChild(_messageWrapper);

// 这里返回的是 messageWrapper 组件引用
const getMessageWrapperRef = () => {
  // 将 <MessageBox /> React 组件，渲染到 _messageWrapper 中，并且返回了 <MessageBox /> 的引用
  // @ts-ignore
  return ReactDom.render(<MessageBox />, _messageWrapper);
};

//
let _messageRef = getMessageWrapperRef();
console.log(_messageRef, '_____________');

const destroy = () => {
  // 将 <ToastContainer /> 组件 unMount，销毁组件
  ReactDom.unmountComponentAtNode(_messageWrapper);
  // 再次创建新的 <ToastContainer /> 引用，以便再次触发 Toast
  _messageRef = getMessageWrapperRef();
};

export default {
  // info: (text: string, duration: number, isShowMask: boolean) => (_messageRef.({type: 'info', text, duration, isShowMask})),
  hide: destroy,
};
