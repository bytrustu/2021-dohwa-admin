import React from 'react';
import Link from 'next/link';

const login = (props) => {
  return (
    <div>
      login
      <br/>
      <span>
      </span>
      <Link href="/">
        <a>홈</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { resolvedUrl } = ctx;
  return {
    props: {
      pathname: resolvedUrl
    },
  };
};


export default login;
