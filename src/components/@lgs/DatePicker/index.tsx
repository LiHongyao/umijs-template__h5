import React, { FC, memo } from 'react';
import './index.less';
interface IProps {
  visible: boolean;
}
const DatePicker: FC<IProps> = props => {
  // props
  const { visible } = props;

  // render
  return (
    <div className={`lg-date-picker ${visible ? 'visible' : ''}`}>
      <div className="lg-date-picker__contents">
        <div className="lg-date-picker__bar">
          <section className="lg-date-picker__button cancle">取消</section>
          <section className="lg-date-picker__button sure">确认</section>
        </div>
      </div>
    </div>
  );
};

export default memo(DatePicker);
