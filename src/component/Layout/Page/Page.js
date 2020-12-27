import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';
import Sider from '../Sider/Sider';
import Content from '../Content/Content';
import Footer from '../Footer';
import './Page.scss';

const Page = ({ children, me }) => {
  return (
    <Layout theme="light" className="layout-warp">
      <Header/>
      <Layout theme="light">
        <Sider/>
        <Content>
          {children}
        </Content>
      </Layout>
      <Footer/>
    </Layout>
  );
};

export default Page;
