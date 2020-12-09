import React, { FC, memo } from 'react';

interface IPickerItem {
  label: string;
  value: string;
  children?: IPickerItem[];
}

interface IProps {
  data: IPickerItem[] /** 数据源 */;
  cols: number /** 显示列数 */;
  value: number[] /** 默认值 */;
  title?: string /** popup组件标题 */;
  cancelText?: string /** popup组件取消按钮标题，默认为“取消” */;
  confirmText?: string /** popup组件确认按钮标题，默认为“确定” */;
  cascade?: string /** 是否级联 */;
  onChange?: () => void /** 点击确定之后组件值发生变化之后的回调 */;
  onPickerChange?: () => void /** 每一列的值变化之后的回调 */;
  onCancel?: () => void /** onCancel */;
}

const Picker: FC<IProps> = props => {
  // render
  return (
    <div className="lg-picker-view">
      {/* 内容 */}
      <div className="lg-picker__content"></div>
      {/* picker */}
      <div className="lg-picker__panel"></div>
    </div>
  );
};

export default memo(Picker);
