import React from 'react';
import Auth from '../../component/Auth';

const index = () => {
  return (
    <Auth/>
  );
};

export default index;

export const getServerSideProps = async (ctx) => {
  const { resolvedUrl } = ctx;
  return {
    props: {
      pathname: resolvedUrl
    },
  };
};