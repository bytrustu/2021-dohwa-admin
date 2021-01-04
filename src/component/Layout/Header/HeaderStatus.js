import React from 'react';
import HeaderButton from './HeaderButton';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const HeaderStatus = () => {
  const router = useRouter();
  const onClickLogout = () => {
    new Cookies().remove('token');
    router.push('/auth');
  };
  return (
    <div className="status-wrap">
      <HeaderButton text={<LogoutOutlined />} onClick={onClickLogout} />
    </div>
  );
};

export default React.memo(HeaderStatus);
