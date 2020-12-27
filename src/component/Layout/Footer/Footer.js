import React from 'react';
import { Layout } from 'antd';
import './Footer.scss';
import FooterLink from './FooterLink';
import FooterCopyright from './FooterCopyright';

const Footer = () => {
  const { Footer } = Layout;

  return (
    <Footer className="footer-wrap">
      <FooterLink text='개인정보관리지침'/>
      <FooterLink text={FooterCopyright()}/>
    </Footer>
  );
};

export default Footer;
