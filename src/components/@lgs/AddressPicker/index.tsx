import React, { FC, memo, useEffect, useState } from 'react';
import './index.less';

export interface IDataModel {
  code: string;
  fullName: string;
}
export interface IData {
  province: IDataModel;
  city: IDataModel;
  area: IDataModel;
}

type KeyType = keyof IData;

interface IProps {
  visible: boolean;
  data: IData;
  onFetch: (code: string) => Promise<any>;
  onSure: (data: IData) => void;
  onClose: () => void;
}

const AddressPicker: FC<IProps> = props => {
  // props
  const {
    visible,
    data = {
      province: { code: '', fullName: '' },
      city: { code: '', fullName: '' },
      area: { code: '', fullName: '' },
    },
    onFetch,
    onSure,
    onClose,
  } = props;

  // state
  const [selectedKey, setSelectedKey] = useState<KeyType>('province');
  const [items, setItems] = useState<IDataModel[]>([] as IDataModel[]);
  const [innerData, setInnerData] = useState(data);

  const getData = (code: string) => {
    onFetch(code).then((items: IDataModel[]) => {
      setItems(items);
    });
  };

  // events
  const onTap = (key: KeyType) => {
    setSelectedKey(key);
    setItems([]);
    let code = '';
    if (key === 'province') {
      setInnerData({
        province: { code: '', fullName: '' },
        city: { code: '', fullName: '' },
        area: { code: '', fullName: '' },
      });
    } else if (key === 'city') {
      code = innerData.province.code;
      setInnerData(prev => ({
        ...prev,
        city: { code: '', fullName: '' },
        area: { code: '', fullName: '' },
      }));
    } else if (key === 'area') {
      code = innerData.city.code;
      setInnerData(prev => ({
        ...prev,
        area: { code: '', fullName: '' },
      }));
    }
    getData(code);
  };

  const onItemTap = (item: IDataModel) => {
    setInnerData(prev => ({
      ...prev,
      [selectedKey]: { ...item },
    }));
    // 处理key值
    if (selectedKey === 'province') {
      setSelectedKey('city');
      getData(item.code);
    } else if (selectedKey === 'city') {
      setSelectedKey('area');
      getData(item.code);
    } else if (selectedKey === 'area') {
      setItems([]);
    }
  };
  const onInnerSure = () => {
    onSure({
      province: { ...innerData.province },
      city: { ...innerData.city },
      area: { ...innerData.area },
    });
    onClose();
  };
  // effects
  useEffect(() => {
    if (!innerData.province.code) {
      getData('');
    }
  }, []);

  // render
  return (
    <div className={`lg-address-picker ${visible ? 'visible' : ''}`}>
      <div className="lg-address-picker__contents">
        {/* 标题 */}
        <h3 className="lg-address-picker__title">已选择</h3>
        {/* 选择结果 */}
        <div className="lg-address-picker__res">
          {/* 省 */}
          <section
            className={`lg-address-picker__res_item ${
              innerData.province.code ? 'selected' : ''
            }`}
            onClick={() => {
              onTap('province');
            }}
          >
            {innerData.province.fullName || '选择省份'}
          </section>
          {/* 市 */}
          {innerData.province.fullName && (
            <section
              className={`lg-address-picker__res_item ${
                innerData.city.code ? 'selected' : ''
              }`}
              onClick={() => {
                onTap('city');
              }}
            >
              {innerData.city.fullName || '选择城市'}
            </section>
          )}
          {/* 区 */}
          {innerData.province.fullName && innerData.city.fullName && (
            <section
              className={`lg-address-picker__res_item ${
                innerData.area.code ? 'selected' : ''
              }`}
              onClick={() => {
                onTap('area');
              }}
            >
              {innerData.area.fullName || '选择城市'}
            </section>
          )}
        </div>
        {/* 选择项 */}
        <ul className="lg-address-picker__list">
          {items.map((item, i) => (
            <li
              key={`lg-address-picker__choose_${i}`}
              onClick={() => {
                onItemTap(item);
              }}
            >
              {item.fullName}
            </li>
          ))}
        </ul>
        {/* 确认按钮 */}
        <div className="lg-address-picker__button" onClick={onInnerSure}>
          确认
        </div>
        {/* 关闭按钮 */}
        <div className="lg-address-picker__close_btn" onClick={onClose} />
      </div>
    </div>
  );
};

export default memo(AddressPicker);
