import React from 'react';
import { Layout } from 'antd';
import { Menu, Button } from 'antd';
import './Sider.scss';
import Link from 'next/link';
import SiderLogo from './SiderLogo';
import { useRouter } from 'next/router';
import SiderUser from './SiderUser';

const menuList = [
  { name: '피부리포트', link: '/inquiry', icon: '🖥' },
  { name: '이벤트', link: '/event', icon: ' 📌' },
  { name: '문의사항', link: '/question', icon: '📋' },
  { name: '제품정보', link: '/product', icon: '🗂' },
  { name: '회원관리', link: '/user', icon: '⚙️' },
  { name: '로그', link: '/log', icon: '🔍' },
];

const Sider = () => {
  const { Sider } = Layout;
  const router = useRouter();
  return (
    <Sider className="sider-wrap">
      <SiderLogo/>
      <SiderUser/>
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
      >
        {
          menuList.map((el, index) => (
            <Menu.Item key={el.link} icon={el.icon} className="menu-item">
              <Link href={el.link}>
                <a>{el.name}</a>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  );
};

export default Sider;
