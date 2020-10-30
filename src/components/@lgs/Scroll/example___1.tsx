/*
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import './index.less';
import { Tabs } from 'antd-mobile';
import Scroll, { IScroll, kPullDownStatus } from '@/components/@lgs/Scroll';
import { kPullType, usePullDown, usePullUp } from '@/components/@lgs/Scroll';
import Api from '@/Api';
import { kPullUpStatus } from '@/components/@lgs/Scroll';

const Task: FC = () => {
  const [list, setList] = useState<{
    a: any[] | null;
    b: any[] | null;
    c: any[] | null;
  }>({
    a: null,
    b: null,
    c: null,
  });

  const [aPage, setAPage] = useState(1);
  const [bPage, setBPage] = useState(1);
  const [cPage, setCPage] = useState(1);

  const [aMore, setAMore] = useState(false);
  const [bMore, setBMore] = useState(false);
  const [cMore, setCMore] = useState(false);

  const [sIndex, setSIndex] = useState(0);
  const [bScroll, setBScroll] = useState<IScroll>();

  const scrollRef = useRef<IScroll | null>(null);

  const tabs = [
    { title: '优选推荐', sub: '1' },
    { title: '简单任务', sub: '2' },
    { title: '高价任务', sub: '3' },
  ];

  const handleLoadMorePage = () => {
    switch (sIndex) {
      case 0:
        return aPage + 1;
      case 1:
        return bPage + 1;
      case 2:
        return cPage + 1;
      default:
        return 1;
    }
  };

  const handlePageWithCallback = (page: number) => {
    switch (sIndex) {
      case 0:
        setAPage(page);
        break;
      case 1:
        setBPage(page);
        break;
      case 2:
        setCPage(page);
        break;
    }
  };

  const handleDataWithCallBack = (
    data: any,
    pageNo: number,
    pages: number,
    type: kPullType,
    resolve: Function,
  ) => {
    setList(prevState => {
      let keys = ['a', 'b', 'c'];
      let key: 'a' | 'b' | 'c' = keys[sIndex] as 'a' | 'b' | 'c';
      if (!prevState[key] || type === kPullType.REFRESH) {
        pageNo >= pages
          ? resolve(kPullDownStatus.NO_MORE)
          : resolve(kPullDownStatus.MORE);
        switch (sIndex) {
          case 0:
            setAMore(pageNo < pages);
            break;
          case 1:
            setBMore(pageNo < pages);
            break;
          case 2:
            setCMore(pageNo < pages);
            break;
        }
        return {
          ...prevState,
          [key]: data,
        };
      } else {
        pageNo >= pages
          ? resolve(kPullUpStatus.NO_MORE)
          : resolve(kPullUpStatus.MORE);
        switch (sIndex) {
          case 0:
            setAMore(pageNo < pages);
            break;
          case 1:
            setBMore(pageNo < pages);
            break;
          case 2:
            setCMore(pageNo < pages);
            break;
        }
        return {
          ...prevState,
          [key]: prevState[key]?.concat(data),
        };
      }
    });
  };

  const getData = (type: kPullType) => {

    let _page: number;
    switch (type) {
      case kPullType.REFRESH:
        _page = 1;
        break;
      case kPullType.LOAD_MORE:
        _page = handleLoadMorePage();
        break;
    }

    return new Promise((resolve, reject) => {
      Api.task
        .taskList<DDOUH5.BaseResponse<any>>({
          page: _page,
          pageSize: 3,
          tags: [sIndex + 1],
        })
        .then(res => {
          if (res && res.code === 0 && res) {
            const {
              data,
              page: { pageNo, pages },
            } = res;
           
            handlePageWithCallback(pageNo);
  
            handleDataWithCallBack(data, pageNo, pages, type, resolve);
          }
        })
        .catch(error => {});
    });
  };
  const onTabChange = (data: { title: string; sub: string }, index: number) => {

    setSIndex(+data.sub - 1);
  };

  const [pullDownStatus, onPullDown] = usePullDown(
    getData.bind(null, kPullType.REFRESH),
    true,
  );

  const [pullUpStatus, onPullUp, setPullUpStatus] = usePullUp(
    getData.bind(null, kPullType.LOAD_MORE),
    pullDownStatus,
  );

  const test = useCallback(
    (sIndex: number) => {
      switch (sIndex) {
        case 0:
          setPullUpStatus(aMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
          break;
        case 1:
          setPullUpStatus(bMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
          break;
        case 2:
          setPullUpStatus(cMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
          break;
      }
    },
    [aMore, bMore, cMore],
  );

  useEffect(() => {
    let keys = ['a', 'b', 'c'];
    let key: 'a' | 'b' | 'c' = keys[sIndex] as 'a' | 'b' | 'c';

    if (sIndex !== 0 && list[key] === null) {
  
      onPullDown();
    } else {
      if (bScroll) {
   
        bScroll.refresh();
        test(sIndex);
      }
    }
  }, [sIndex]);

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.bScroll) {
   
      setBScroll(scrollRef.current.bScroll);
    }
  }, [scrollRef.current]);
  return (
    <Scroll
      ref={scrollRef}
      pullUpStatus={pullUpStatus}
      onPullUp={onPullUp}
      pullDownStatus={pullDownStatus}
      onPullDown={onPullDown}
    >
      <div className="page task">
        <div className="top-bar"></div>
   
        <Tabs tabs={tabs} onChange={onTabChange}>
          <div className="tab-item tab-item-1">
            {list.a &&
              list.a.map((item, i) => (
                <section className="task-item" key={`task_item_a__${i}`}>
                  {item.taskName}
                </section>
              ))}
          </div>

          <div className="tab-item tab-item-2">
            {list.b &&
              list.b.map((item, i) => (
                <section className="task-item" key={`task_item_b__${i}`}>
                  {item.taskName}
                </section>
              ))}
          </div>

          <div className="tab-item tab-item-3">
            {list.c &&
              list.c.map((item, i) => (
                <section className="task-item" key={`task_item_c__${i}`}>
                  {item.taskName}
                </section>
              ))}
          </div>
        </Tabs>
      </div>
    </Scroll>
  );
};

export default Task;
*/
