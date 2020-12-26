import React from 'react';
import style from './Footer.module.scss';

const FooterCopyright = () => {
  return (
    <>
      <span className={style.linkText}>ⓒ</span>
      <a>MANEK Corp.</a>
      <span className={style.linkText}>All rights reserved.</span>
    </>
  );
};

export default FooterCopyright;
