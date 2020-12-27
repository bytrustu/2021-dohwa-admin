import React from 'react';
import Link from 'next/link';
import './Footer.scss';

const FooterLink = ({ text }) => {
  return (
    <Link className="link-text" href={''}>
      <a>{text}</a>
    </Link>
  );
};

export default FooterLink;
