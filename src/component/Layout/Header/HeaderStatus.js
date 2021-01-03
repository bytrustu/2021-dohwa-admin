import React from 'react';
import HeaderButton from './HeaderButton';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const HeaderStatus = () => {
  const router = useRouter();
  const onClickLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/auth');
  };
  return (
    <div className="status-wrap">
      <HeaderButton text={<LogoutOutlined />} onClick={onClickLogout} />
    </div>
  );
};

export default React.memo(HeaderStatus);
