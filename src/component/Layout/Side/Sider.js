import React from 'react';
import { Layout } from 'antd';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import style from '../Layout.module.scss';
import Link from 'next/link';

const Sider = () => {

  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sider className={style.siderWrap}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<span>gi</span>}>
          <Link href='/auth/login2'>
            <a>메뉴</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link href='/'>
            <a>메뉴2</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          메뉴 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sider;
