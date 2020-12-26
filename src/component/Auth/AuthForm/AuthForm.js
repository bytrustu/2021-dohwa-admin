import React from 'react';
import style from './AuthForm.module.scss';
import { Tabs } from 'antd';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const { TabPane } = Tabs;

const AuthForm = () => {
  return (
    <div className={style.formWrap}>
      <Tabs defaultActiveKey="1"  centered className={style.tabWrap} size='large'>
        <TabPane tab="ID/PW 로그인" key="1" className={style.tabItem}>
          <LoginForm/>
        </TabPane>
        <TabPane tab="관리자계정 가입" key="2">
          <SignupForm/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthForm;
