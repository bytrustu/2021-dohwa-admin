import React from 'react';
import { Layout } from 'antd';
import style from './Page.module.scss';
import Auth from '../Auth';

const Page = () => {
  return (
    <Layout className={style.pageWrap}>
      <Auth/>
    </Layout>
  );
};

export default Page;
