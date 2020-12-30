import React from 'react';
import { Layout } from 'antd';

const Content = ({children}) => {
  const { Content } = Layout;
  return (
    <Content className="layout-content-wrap">
      {children}
    </Content>
  );
};

export default Content;
