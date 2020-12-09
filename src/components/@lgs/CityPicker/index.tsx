import React, { CSSProperties, FC, memo, useRef } from 'react';
import { citys as citysData } from './data/citys';
import './index.less';

interface IProps {
  visible: boolean;
  anchorStyle?: CSSProperties;
  onClose: () => void;
  onChange: (city: string) => void;
  renderTitle?: () => JSX.Element | JSX.Element[];
}

const CityPicker: FC<IProps> = props => {
  // refs
  const itemListWrapper = useRef<HTMLDivElement>(null);
  const itemListRef = useRef<HTMLDivElement[]>([]);

  // events
  const onClickPosition = (index: number) => {
    const wrapper = itemListWrapper.current;
    const list = itemListRef.current;

    if (wrapper && list) {
      wrapper.scrollTop = list[index].offsetTop;
    }
  };
  // render
  return (
    <div
      className={`lg-city-picker ${props.visible ? 'visible' : ''}`}
      onClick={() => {
        props.onClose();
      }}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className="lg-city-picker__content"
      >
        <div className="lg-city-picker__title">
          {props.renderTitle ? props.renderTitle() : '选择城市'}
        </div>
        <div ref={itemListWrapper} className="lg-city-picker__groups">
          {citysData.map((el, index) => {
            return (
              <div
                ref={(dom: HTMLDivElement) => {
                  itemListRef.current.push(dom);
                }}
                key={`code${index}`}
                className="lg-city-picker__item"
              >
                <div className="lg-city-picker__item_title">{el.code}</div>
                {el.citys.map((city, cityIndex) => {
                  return (
                    <div
                      className="lg-city-picker__item_city"
                      onClick={() => {
                        props.onChange(city);
                        props.onClose();
                      }}
                      key={`city${cityIndex}`}
                    >
                      {city}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="lg-city-picker__anchor" style={props.anchorStyle}>
          {citysData.map((el, index) => {
            return (
              <div
                onClick={e => {
                  e.stopPropagation();
                  onClickPosition(index);
                }}
                key={`postion${index}`}
              >
                {el.code}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(CityPicker);
