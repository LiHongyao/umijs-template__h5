import React, { FC, memo, useState } from 'react';
import './index.less';

export interface IRadioItem {
  label: string;
  value: string | number;
  checked?: boolean;
}

interface IProps {
  data: IRadioItem[];
  disabled?: boolean;
  icon?: any;
  checkedIcon?: any;
  onChange: (value: IRadioItem) => void;
}

const RadioGroup: FC<IProps> = props => {
  const { data, disabled, icon, checkedIcon, onChange } = props;
  const [innerData, setInnerData] = useState(data);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onRadioChange = (value: IRadioItem, index: number) => {
    if (disabled || index === selectedIndex) {
      return;
    }
    setSelectedIndex(index);
    setInnerData(prevState =>
      prevState.map((item, i) => ({
        ...item,
        checked: i === index,
      })),
    );
    delete value.checked;
    onChange(value);
  };
  return (
    <div className="lg-radio">
      {innerData.map((item, i) => (
        <section
          key={`lg-radio__item_${i}`}
          className="lg-radio__item"
          onClick={() => {
            onRadioChange(item, i);
          }}
        >
          {item.checked ? (
            <img
              src={checkedIcon || require('./images/icon__checked.png')}
              alt=""
              className="lg-raido__check-icon"
            />
          ) : (
            <img
              src={icon || require('./images/icon__check.png')}
              alt=""
              className="lg-raido__check-icon"
            />
          )}
          <span>{item.label}</span>
        </section>
      ))}
    </div>
  );
};

export default memo(RadioGroup);
