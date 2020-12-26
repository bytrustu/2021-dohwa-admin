import React from 'react';
import style from './Header.module.scss';
import HeaderButton from './HeaderButton';
import {
  LogoutOutlined
} from '@ant-design/icons';

const HeaderStatus = () => {
  return (
    <div className={style.statusWrap}>
      <HeaderButton text={<LogoutOutlined />}/>
      <HeaderButton text={2}/>
      <HeaderButton text={3}/>
      <HeaderButton text={4}/>
    </div>
  );
};

export default HeaderStatus;
