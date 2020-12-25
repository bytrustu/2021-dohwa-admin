import React from 'react';
import { Layout } from 'antd';
import style from '../Layout.module.scss';

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className={style.footerWrap}>
      Footer
    </Footer>
  );
};

export default Footer;
