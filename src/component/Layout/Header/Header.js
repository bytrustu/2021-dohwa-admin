import React from 'react';
import { Layout } from 'antd';
import style from './Header.module.scss';
import HeaderTitle from './HeaderTitle';
import HeaderStatus from './HeaderStatus';

const PageHeader = () => {
  const { Header } = Layout;
  return (
    <Header className={style.headerWrap}>
      <HeaderTitle/>
      <HeaderStatus/>
    </Header>
  );
};

export default PageHeader;
