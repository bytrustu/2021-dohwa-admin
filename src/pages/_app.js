import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../assets/scss/main.scss';
import Layout from '../component/Layout';
import axios from '../lib/defaultClient';
import { loadUserAPI } from '../lib/api/auth';

const MyApp = ({ Component, pageProps, me }) => {
    return (
      <>
        <Head>
          <title>도화 관리자</title>
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                className="next-head" />
        </Head>
        {
          (pageProps && pageProps.pathname === '/auth') || (pageProps && pageProps.pathname === '/auth/signup')
            ?
            <Component {...pageProps} />
            :
            <Layout>
              <Component {...pageProps} me={me}/>
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

MyApp.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  try {
    const cookies = ctx.req ? ctx.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (ctx.req && cookies) {
      axios.defaults.headers.Cookie = cookies;
    }
    const user = await loadUserAPI();
    if (ctx.pathname === '/auth') {
      ctx.res.statusCode = 302;
      ctx.res.setHeader('Location', '/');
    }
    return { pageProps, me: user.data };
  } catch (e) {
    if (ctx.pathname !== '/auth') {
      ctx.res.statusCode = 302;
      ctx.res.setHeader('Location', '/auth');
    }
    return { pageProps };
  }
};

export default MyApp;