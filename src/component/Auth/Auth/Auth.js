import React from 'react';
import style from './Auth.module.scss'
import AuthTitle from '../AuthTitle';
import AuthForm from '../AuthForm';

const Auth = () => {
  return (
    <section className={style.authWrap}>
      <AuthTitle/>
      <AuthForm/>
    </section>
  );
};

export default Auth;
