import React from 'react';
import { Layout } from 'antd';
import FooterLink from './FooterLink';
import FooterCopyright from './FooterCopyright';

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className="layout-footer-wrap">
      <FooterLink text='개인정보관리지침'/>
      <FooterLink>
        <FooterCopyright/>
      </FooterLink>
    </Footer>
  );
};

export default React.memo(Footer);
