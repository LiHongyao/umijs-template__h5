import React, { FC, memo, useState } from 'react';

interface IOptions {
  type: 'default';
  message: string;
  duration: number;
  visible: boolean;
}
interface IListItem extends IOptions {
  uuid: string;
}

const MessageBox: FC = props => {
  const [visible, setVisible] = useState(false);
  const [msgList, setMsgList] = useState<IListItem[]>([]);

  const pushMessage = (options: IOptions) => {
    const { type, message, duration, visible } = options;
    setMsgList(prevState =>
      prevState.concat({
        uuid: getUuid(),
        message,
        type,
        duration,
        visible,
      }),
    );
    setVisible(visible);
  };
  const popMessage = (id: string, visible: boolean) => {
    const newList = msgList.filter((item: IListItem) => item.uuid !== id);
    setMsgList(newList);
    // 该 toast item 是否为 toastList 中 duration 最长的 item
    let isTheMaxDuration = true;
    // 该 toast item 的 duration
    const targetDuration =
      msgList.find((item: IListItem) => item.uuid === id)?.duration || 0;
    // 遍历 toastList 检查是否为最长 duration
    msgList.forEach((item: IListItem) => {
      if (item.visible && item.duration > targetDuration) {
        isTheMaxDuration = false;
      }
      return null;
    });
    // 隐藏 mask
    if (visible && isTheMaxDuration) {
      setVisible(false);
    }
  };

  return <div></div>;
};

// 生成唯一的id
let toastCount = 0;
const getUuid = () => {
  return 'lg-message__' + new Date().getTime() + '-' + toastCount++;
};

export default memo(MessageBox);
