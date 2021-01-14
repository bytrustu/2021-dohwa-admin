import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../assets/scss/main.scss';
import Layout from '../component/Layout';
import axios from '../lib/defaultClient';
import { loadUserAPI } from '../lib/api/auth';
import Router from 'next/router';
import PageLoading from '../component/Loading/PageLoading';

const MyApp = ({ Component, pageProps, me }) => {

  const [loading, SetLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      SetLoading(true);
    };
    const end = () => {
      SetLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
      <>
        <Head>
          <title>도화 관리자</title>
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                className="next-head" />
        </Head>

        {
          loading && <PageLoading/>
        }

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