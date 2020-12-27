import React from 'react';
import { Layout } from 'antd';
import './Content.scss';

const Content = ({children}) => {
  const { Content } = Layout;
  return (
    <Content className="content-wrap">
      {children}
    </Content>
  );
};

export default Content;
