import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../assets/scss/base/_reset.scss';
import '../assets/scss/lib/_variable.scss';
import Layout from '../component/Layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>도화 관리자</title>
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              className="next-head" />
      </Head>
      {
        (pageProps && pageProps.pathname === '/auth/login') || (pageProps && pageProps.pathname === '/auth/signup')
          ?
          <Component {...pageProps} />
          :
          <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </>
  );
}
;

MyApp.propTypes =
{
  Component: PropTypes.elementType.isRequired,
}
;

MyApp.getInitialProps = async context =>
{
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
}
;

export default MyApp;