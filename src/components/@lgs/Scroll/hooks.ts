/*
 * @Author: Li-HONGYAO
 * @Date: 2020-12-09 18:07:21
 * @LastEditTime: 2021-01-12 09:53:11
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /d-point-client/src/components/@lgs/Scroll/hooks.ts
 */
import { useEffect, useState } from 'react';
import { kPullDownStatus, kPullUpStatus } from './index';
/**
 * 下拉刷新
 * @param fetch   请求数据的函数
 * @param isInit  是否需要首次加载
 * @return [status, eventHandler]
 */
export function usePullDown(
  fetch: (...args: any) => Promise<any>,
  isInit = false,
): [kPullDownStatus, () => void] {
  // status
  const [pullDownStatus, setPullDownStatus] = useState<kPullDownStatus>(
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
    if (isInit) onPullDown();
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
  fetch: (...args: any) => Promise<any>,
  pullDownStatus: kPullDownStatus,
): [kPullUpStatus, () => void, (status: kPullUpStatus) => void] {
  const [pullUpStatus, setPullUpStatus] = useState<kPullUpStatus>(
    kPullUpStatus.INITIAL,
  );
  const onPullUp = () => {
    if (pullUpStatus !== kPullUpStatus.MORE) {
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
