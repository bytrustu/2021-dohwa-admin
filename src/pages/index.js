import React from 'react';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <>
      Hello Nextjs
      <Link href="/auth/login">
        <a>로그인</a>
      </Link>
    </>
  );
};

export default IndexPage;