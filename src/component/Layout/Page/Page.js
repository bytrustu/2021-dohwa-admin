import React from 'react';
import { Layout } from 'antd'
import Header from '../Header/Header';
import Sider from '../Side/Sider';
import Content from '../Content/Content';
import Footer from '../Footer';
import style from '../Layout.module.scss';

const Page = ({ children }) => {
  return (
    <Layout theme='light' className={style.layoutWarp}>
      <Header/>
      <Layout theme='light'>
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
