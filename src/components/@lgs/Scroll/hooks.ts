import { useEffect, useState } from 'react';
import { kPullDownStatus, kPullUpStatus } from './index';

/**
 * 下拉刷新
 * @param fetch   请求数据的函数
 * @param isInit  是否需要首次加载
 * @return [status, eventHandler]
 */
export function usePullDown(
  fetch: Function,
  isInit = false,
): [kPullDownStatus, () => void] {
  // status
  let [pullDownStatus, setPullDownStatus] = useState<kPullDownStatus>(
    kPullDownStatus.REFRESH,
  );
  // handler
  const onPullDown = () => {
    setPullDownStatus(kPullDownStatus.LOADING);
    fetch().then((status: kPullDownStatus) => {
      setPullDownStatus(kPullDownStatus.DONE);
      setPullDownStatus(status);
      setTimeout(() => {
        setPullDownStatus(kPullDownStatus.REFRESH);
      }, 500);
    });
  };
  useEffect(() => {
    isInit && onPullDown();
  }, []);
  return [pullDownStatus, onPullDown];
}

/**
 * 上拉加载
 * @param fetch 请求数据的函数
 * @param pullDownStatus 下拉状态
 * @return [status, eventHandler, setPullUpStatus]
 */
export function usePullUp(
  fetch: Function,
  pullDownStatus: kPullDownStatus,
): [kPullUpStatus, () => void, (status: kPullUpStatus) => void] {
  let [pullUpStatus, setPullUpStatus] = useState<kPullUpStatus>(
    kPullUpStatus.INITIAL,
  );
  const onPullUp = () => {
    if (pullUpStatus === kPullUpStatus.NO_MORE) {
      return;
    }
    setPullUpStatus(kPullUpStatus.LOADING);
    fetch().then((status: kPullUpStatus) => {
      setPullUpStatus(kPullUpStatus.LOADED);
      setTimeout(() => {
        setPullUpStatus(status);
      }, 0);
    });
  };
  // 根据下拉刷新的状态/修改上拉加载的状态
  useEffect(() => {
    if (pullDownStatus === kPullDownStatus.MORE) {
      setPullUpStatus(kPullUpStatus.MORE);
    } else if (pullDownStatus === kPullDownStatus.NO_MORE) {
      setPullUpStatus(kPullUpStatus.NO_MORE);
    }
  }, [pullDownStatus]);
  return [pullUpStatus, onPullUp, setPullUpStatus];
}
