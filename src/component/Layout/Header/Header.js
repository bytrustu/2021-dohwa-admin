import React from 'react';
import { Layout } from 'antd';
import HeaderTitle from './HeaderTitle';
import HeaderStatus from './HeaderStatus';

const PageHeader = () => {
  const { Header } = Layout;
  return (
    <Header className="layout-header-wrap">
      <HeaderTitle/>
      <HeaderStatus/>
    </Header>
  );
};

export default PageHeader;
