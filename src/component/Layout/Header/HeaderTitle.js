import React from 'react';
import style from './Header.module.scss';
import Link from 'next/link';

const HeaderTitle = () => {
  return (
    <div className={style.titleWrap}>
      <Link href='/'>
        <a>
          <strong>DOWHA ADMIN</strong>
        </a>
      </Link>
    </div>
  );
};

export default HeaderTitle;
