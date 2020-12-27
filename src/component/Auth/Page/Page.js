import React from 'react';
import { Layout } from 'antd';
import './Page.scss';
import Auth from '../Auth';

const Page = () => {
  return (
    <Layout className="page-wrap">
      <Auth/>
    </Layout>
  );
};

export default Page;
