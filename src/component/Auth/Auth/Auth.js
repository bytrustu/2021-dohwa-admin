import React from 'react';
import AuthTitle from '../AuthTitle';
import AuthForm from '../AuthForm';
import './Auth.scss';

const Auth = () => {
  return (
    <section className="auth-wrap">
      <AuthTitle />
      <AuthForm />
    </section>
  );
};

export default Auth;
