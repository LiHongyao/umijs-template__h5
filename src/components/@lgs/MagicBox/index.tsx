import React, { FC, memo, useEffect, useRef, useState } from 'react';
import './index.less';

interface IProps {
  children: JSX.Element | JSX.Element[];
  maxColumns?: number;
  gap?: number;
}

const MagicBox: FC<IProps> = props => {
  // props
  const { maxColumns = 3, gap = 10 } = props;
  // refs
  const lgWrapper = useRef<HTMLDivElement | null>(null);
  // state
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (lgWrapper.current) {
      let type = Object.prototype.toString
        .call(props.children)
        .slice(8, -1)
        .toLowerCase();
      if (type === 'array') {
        let children = props.children as JSX.Element[];
        let w = lgWrapper.current.getBoundingClientRect().width;
        let columns =
          children.length < maxColumns ? children.length : maxColumns;
        setWidth(() => {
          return (w - (columns - 1) * gap) / columns;
        });
      }
    }
  }, [lgWrapper]);

  const renderItems = () => {
    let type = Object.prototype.toString
      .call(props.children)
      .slice(8, -1)
      .toLowerCase();
    if (type === 'array') {
      let children = props.children as JSX.Element[];
      let columns = children.length < maxColumns ? children.length : maxColumns;
      return children.map((element: JSX.Element, i: number) => {
        return (
          <section
            className="lg-magic-box__item"
            key={`lg-magic-box__item__${i}`}
            style={{
              width: width + 'px',
              marginRight: (i + 1) % columns === 0 ? `0px` : `${gap}px`,
            }}
          >
            {element}
          </section>
        );
      });
    } else {
      return (
        <section className="lg-magic-box__item" style={{ flex: 1 }}>
          {props.children}
        </section>
      );
    }
  };
  // render
  return (
    <div className="lg-magic-box" ref={lgWrapper}>
      {renderItems()}
    </div>
  );
};

export default memo(MagicBox);
