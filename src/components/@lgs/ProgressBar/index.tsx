import React, { FC, memo } from 'react';
import './index.less';

export type NodeType = {
  percent: number;
  icon: any;
  tips: string;
};

interface IProps {
  showInfo?: boolean /** 是否显示进度数值或状态图标 */;
  percent?: number /** 当前值的百分比 */;
  strokeColor?: string /** 进度条的色彩 */;
  trailColor?: string /** 未完成的分段的颜色 */;
  nodes?: NodeType[] /** 节点信息 */;
}
const Progress: FC<IProps> = (props) => {
  const {
    percent = 0,
    showInfo = false,
    trailColor = '#E2E2E2',
    strokeColor = '#FF9B19',
  } = props;

  return (
    <div className="lg-progress-bar">
      {/* 进度 */}
      <div
        className="lg-progress-bar__bg"
        style={{
          background: trailColor,
        }}
      >
        {/* 当前值 */}
        <div
          className="lg-progress-bar__cur"
          style={{
            width: percent + '%',
            background: strokeColor,
          }}
        />
        {/* 节点信息 */}
        {props.nodes &&
          props.nodes.map((node, i) => (
            <section
              key={`lg-progress-bar__node__${i}`}
              className="lg-progress-bar__node"
              data-tips={node.tips}
              style={(() => {
                if (node.percent <= 0) {
                  return {
                    left: 0,
                  };
                } else if (node.percent >= 100) {
                  return {
                    right: 0,
                  };
                } else {
                  return {
                    left: node.percent + '%',
                    transform: 'translate(-50%, -50%)',
                  };
                }
              })()}
            >
              <img src={node.icon} className="lg-progress-bar__icon" />
            </section>
          ))}
      </div>
      {/* 文案 */}
      {showInfo && <div className="lg-progress-bar__tips">{percent + '%'}</div>}
    </div>
  );
};

export default memo(Progress);
