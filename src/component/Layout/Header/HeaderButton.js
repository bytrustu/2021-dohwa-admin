import React from 'react';
import style from './Header.module.scss';
import { Button } from 'antd';

const HeaderButton = ({ text }) => {
  return (
    <Button type="default" className={style.buttonWrap}>
      {text}
    </Button>
  );
};

export default HeaderButton;
