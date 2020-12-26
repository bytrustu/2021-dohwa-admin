import React from 'react';
import style from './Sider.module.scss';
import { Image } from 'antd';
import Link from 'next/link';

const SiderLogo = () => {
  return (
    <Link href='/'>
      <a>
        <div className={`${style.logoWrap}`}>
          <Image src='/images/layout/logo.png' />
        </div>
      </a>
    </Link>
  );
};

export default SiderLogo;
