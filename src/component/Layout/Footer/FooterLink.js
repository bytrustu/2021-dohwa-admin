import React from 'react';
import Link from 'next/link';
import style from './Footer.module.scss';

const FooterLink = ({ text }) => {
  return (
    <Link className={style.linkWrap} href={''}>
      <a>{text}</a>
    </Link>
  );
};

export default FooterLink;
