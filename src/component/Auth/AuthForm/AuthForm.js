import React, { useRef, useEffect } from 'react';
import { Tabs, message } from 'antd';
import InputForm from './InputForm';
import { loginAPI, signupAPI } from '../../../lib/api/auth';


const { TabPane } = Tabs;

const AuthForm = () => {

  const loginForm = {
    form: [
      { type: 'text', name: 'email', label: '이메일', placeholder: '이메일' },
      { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호' },
    ],
    request: {
      type: '로그인',
      funcAPI: loginAPI,
    },
  };

  const signupForm = {
    form: [
      { type: 'text', name: 'email', label: '이메일', placeholder: '이메일' },
      { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호' },
      { type: 'text', name: 'name', label: '이름', placeholder: '이름' },
    ],
    request: {
      type: '가입',
      funcAPI: signupAPI,
    },
  };



  return (
    <>
      <div className="form-wrap">
        <Tabs
          defaultActiveKey="1"
          centered
          className="tab-wrap"
          size='large'
        >
          <TabPane tab="ID/PW 로그인" key="login" className="tab-item">
            <InputForm data={loginForm} />
          </TabPane>
          <TabPane tab="관리자계정 가입" key="signup" className="tab-item">
            <InputForm data={signupForm} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default React.memo(AuthForm);
