import React from 'react';
import { Layout } from 'antd';
import style from '../Layout.module.scss';

const PageHeader = () => {
  const { Header } = Layout;
  return (
    <Header className={style.headerWrap}>
      Header
    </Header>
  );
};

export default PageHeader;
