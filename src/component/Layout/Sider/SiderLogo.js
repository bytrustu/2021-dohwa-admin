import React from 'react';
import { Image } from 'antd';
import Link from 'next/link';

const SiderLogo = () => {
  return (
    <Link href="/">
      <a>
        <div className="logo-wrap">
          <Image src="/images/layout/logo.png" />
        </div>
      </a>
    </Link>
  );
};

export default React.memo(SiderLogo);
