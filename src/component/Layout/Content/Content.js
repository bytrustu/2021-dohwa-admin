import React from 'react';
import { Layout } from 'antd';
import style from '../Layout.module.scss';

const Content = ({children}) => {
  const { Content } = Layout;
  return (
    <Content className={style.contentWrap}>
      {children}
    </Content>
  );
};

export default Content;
