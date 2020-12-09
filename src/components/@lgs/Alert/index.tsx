import React, { FC } from 'react';
import ReactDom from 'react-dom';
import './index.less';

interface IOptions {
  message: string /** 内容 */;
  align?: 'left' | 'center' | 'right' /** 内容对齐方式 */;
  title?: string /** 标题 */;
  showCancel?: boolean;
  sureButtonText?: string /** 确认按钮文案 */;
  cancelButtonText?: string /** 取消按钮文案 */;
  icon?: any /** 是否显示icon图标 */;
  onSure?: () => void /** 用户点击确认 */;
  onCancel?: () => void /** 用户点击取消 */;
}
interface IProps {
  dom: Element;
  config: IOptions;
}
const Alert: FC<IProps> = props => {
  // props
  const {
    dom,
    config: {
      align = 'left',
      sureButtonText = '确定',
      cancelButtonText = '取消',
    },
  } = props;
  // events
  const onButtonTap = (type: 'cancel' | 'sure') => {
    ReactDom.unmountComponentAtNode(dom);
    switch (type) {
      case 'sure':
        if (props.config.onSure) props.config.onSure();
        break;
      case 'cancel':
        if (props.config.onCancel) props.config.onCancel();
        break;
    }
  };
  // render
  return (
    <div className="lg-alert__wrapper">
      <div className="lg-alert__content">
        <div className="lg-alert__box">
          {/* icon */}
          {props.config.icon && (
            <div className="lg-alert__icon">
              <img
                src={
                  props.config.icon === true
                    ? require('./images/icon__tips.png')
                    : props.config.icon
                }
                alt="提示图标"
              />
            </div>
          )}
          {/* 标题 */}
          {props.config.title && !props.config.icon && (
            <div
              className={`lg-alert__title ${
                props.config.icon ? '__hasIcon' : ''
              }`}
            >
              {props.config.title}
            </div>
          )}
          {/* 内容 */}
          {props.config.message && (
            <div
              className={`lg-alert__message __${align}`}
              style={{ textAlign: align }}
            >
              {props.config.message}
            </div>
          )}
        </div>
        {/* 按钮 */}
        <div className="lg-alert__button_wrapper">
          {props.config.showCancel && (
            <>
              <section
                className="lg-alert__button lg-alert__button_canel"
                onClick={() => onButtonTap('cancel')}
              >
                {cancelButtonText}
              </section>
              <section className="lg-alert__line" />
            </>
          )}
          <section
            className="lg-alert__button lg-alert__button_sure"
            onClick={() => onButtonTap('sure')}
          >
            {sureButtonText}
          </section>
        </div>
      </div>
    </div>
  );
};

function info(options: IOptions | string) {
  // 判断数据类型
  if (typeof options === 'string') {
    options = { message: options };
  }
  // 构造容器
  let wrap = document.querySelector('.lg-alert');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.setAttribute('class', 'lg-alert');
    document.body.appendChild(wrap);
  }
  // 卸载组件
  ReactDom.unmountComponentAtNode(wrap);
  // 渲染组件
  ReactDom.render(<Alert dom={wrap} config={options} />, wrap);
}

export default {
  info,
};
