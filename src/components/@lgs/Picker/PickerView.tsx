import React, { FC, memo, useEffect, useState } from 'react';
import PickerColumn from './PickerColumn';

import './PickerView.less';

interface IPickerItem {
  label: string;
  value: string;
  children?: IPickerItem[];
}

interface IProps {
  data: IPickerItem[] /** 数据源 */;
  col?: number /** 显示列数 */;
  value: string[] /** 默认值 */;
  title?: string /** popup组件标题 */;
  cancelText?: string /** popup组件取消按钮标题，默认为“取消” */;
  confirmText?: string /** popup组件确认按钮标题，默认为“确定” */;
  cascade?: string /** 是否级联 */;
  onChange?: (
    value: string[],
  ) => void /** 点击确定之后组件值发生变化之后的回调 */;
  onPickerChange?: () => void /** 每一列的值变化之后的回调 */;
  onCancel?: () => void /** onCancel */;
}

const PickerView: FC<IProps> = props => {
  // 1. 处理默认值
  const { col = 1, cascade = true } = props;

  // 2. state
  const [defaultSelectedValue, setDefaultSelectedValue] = useState(props.value);
  // 3. ref
  // 4. methods
  const getNewValue = (
    tree: IPickerItem[],
    oldValue: string[],
    newValue: string[],
    deep: number,
  ) => {
    // 遍历tree
    let has: number | undefined;
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].value === oldValue[deep]) {
        newValue.push(tree[i].value);
        has = i;
      }
    }
    //
    if (has === undefined) {
      has = 0;
      newValue.push(tree[has].value);
    }
    // 如果children存在则继续遍历，直到three不存在为止
    const children = tree[has].children;
    if (children) {
      getNewValue(children, oldValue, newValue, deep + 1);
    }
    return newValue;
  };
  const getColumnsData = (
    tree: IPickerItem[],
    value: string[],
    hasFind: any[],
    deep: number,
  ) => {
    // 遍历tree
    let has: number | undefined;
    const arr: IPickerItem[] = [];
    for (let i = 0; i < tree.length; i++) {
      arr.push({ label: tree[i].label, value: tree[i].value });
      if (tree[i].value === value[deep]) {
        has = i;
      }
    }
    // 判断有没有找到
    // 没找到return
    // 找到了 没有下一集 也return
    // 有下一级 则递归
    if (has === undefined) return hasFind;
    hasFind.push(arr);
    const children = tree[has].children;
    if (children) {
      getColumnsData(children, value, hasFind, deep + 1);
    }
    return hasFind;
  };
  const getColumns = () => {
    const result = [];
    if (defaultSelectedValue.length === 0) return;
    let arr = [];
    if (cascade) {
      arr = getColumnsData(props.data, defaultSelectedValue, [], 0);
    } else {
      arr = [...props.data];
    }
    for (let i = 0; i < col; i++) {
      result.push(
        <PickerColumn
          key={i}
          value={defaultSelectedValue[i]}
          data={arr[i]}
          index={i}
          onValueChange={onValueChange}
        />,
      );
    }
    return result;
  };
  // 5. events
  const onValueChange = (newValue: string, index: number) => {
    // 子组件column发生变化的回调函数
    // 每次值发生变化 都要判断整个值数组的新值
    const oldValue = defaultSelectedValue.slice();
    oldValue[index] = newValue;

    if (cascade) {
      // 如果级联的情况下
      const newState = getNewValue(props.data, oldValue, [], 0);
      setDefaultSelectedValue(newState);
      if (props.onChange) props.onChange(newState);
    } else {
      // 不级联 单纯改对应数据
      setDefaultSelectedValue(oldValue);
      if (props.onChange) props.onChange(oldValue);
    }
  };
  // 6. effects
  // 7. render
  return <div className="lg-picker-view">{getColumns()}</div>;
};

export default memo(PickerView);
