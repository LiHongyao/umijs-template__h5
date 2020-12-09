// 根据data生成选项列表
// 根据value 选中对应选项
// 识别滚动手势操作 用户在每一列自由滚动
// 滚动停止时候 识别当前选中的值 并反馈给PickerView

import React, { FC, memo } from 'react';
import classNames from 'lg-classnames';
import './PickerColumn.less';

interface IPickerItem {
  label: string;
  value: string;
}
interface IProps {
  value: string;
  data: IPickerItem[];
  index: number;
  onValueChange: (newValue: string, index: number) => void;
}
const PickerColumn: FC<IProps> = props => {
  // methods
  const getCols = () => {
    // 根据value 和 index 获取到对应的data
    const { data, value, index } = props;
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(
        <section key={i} className={classNames(['lg-picker-column__items'])}>
          {data[i].label}
        </section>,
      );
    }
    return result;
  };
  // render
  return <div className="lg-picker-column">{getCols()}</div>;
};

export default memo(PickerColumn);
