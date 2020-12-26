import React, { useRef } from 'react';
import style from './AuthForm.module.scss';
import { Tabs } from 'antd';
import InputForm from './InputForm';

const { TabPane } = Tabs;

const AuthForm = () => {

  const loginForm = {
    form: [
      { type: 'text', name: 'email', label: '이메일', placeholder: '이메일' },
      { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호' },
    ],
    button: {
      text: '로그인',
      onClick : () => { console.log(1) }
    }
  };

  const signupForm = {
    form: [
      { type: 'text', name: 'email', label: '이메일', placeholder: '이메일' },
      { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호' },
      { type: 'text', name: 'name', label: '이름', placeholder: '이름' },
    ],
    button: {
      text: '가입',
      onClick : () => { console.log(1) }
    }
  };


  return (
    <div className={style.formWrap}>
      <Tabs
        defaultActiveKey="1"
        centered
        className={style.tabWrap}
        size='large'
      >
        <TabPane tab="ID/PW 로그인" key="login" className={style.tabItem}>
          <InputForm data={loginForm}/>
        </TabPane>
        <TabPane tab="관리자계정 가입" key="signup" className={style.tabItem}>
          <InputForm data={signupForm}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthForm;
