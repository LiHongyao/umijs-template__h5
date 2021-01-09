import AppHeader from '@/components/@lgs/AppHeader';
import jsBridge from 'lg-js-bridge';
import Tools from 'lg-tools';
import Validator from 'lg-validator';
import React, { FC, useEffect, useState } from 'react';
import { history } from 'umi';
import './index.less';

type QueryType = {
  url: string;
  title: string;
  appBack: string;
  bgColor: string;
};

const Webview: FC = () => {
  // query
  const [query] = useState<QueryType>(Tools.query<QueryType>());
  const [iHeight, setIHeight] = useState('0');

  // events
  const onBack = () => {
    if (query.appBack === '1') {
      jsBridge.nativeBack();
    } else {
      history.goBack();
    }
  };

  // effects
  useEffect(() => {
    if (query.title) {
      setIHeight(
        Validator.bangScreen() ? 'calc(100vh - 88px)' : 'calc(100vh - 64px)',
      );
    } else {
      setIHeight(
        Validator.bangScreen() ? 'calc(100vh - 44px)' : 'calc(100vh - 20px)',
      );
    }
  }, []);

  // render
  return (
    <div className="page webview">
      {/* 状态栏 */}
      {query.title ? (
        <AppHeader
          title={query.title}
          backgroundColor={query.bgColor}
          showBack
        />
      ) : (
        <>
          <div
            className="status-bar"
            style={{
              height: Validator.bangScreen() ? '44px' : '20px',
              backgroundColor: query.bgColor || '#2875e8',
            }}
          />
          <div
            className="back-button"
            onClick={onBack}
            style={{
              top: Validator.bangScreen() ? '53px' : '29px',
            }}
          />
        </>
      )}
      <iframe
        src={query.url}
        frameBorder="0"
        style={{
          height: iHeight,
        }}
      />
    </div>
  );
};

export default Webview;
