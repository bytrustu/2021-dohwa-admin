import React from 'react';
import Link from 'next/link';

const HeaderTitle = () => {
  return (
    <div className="title-wrap">
      <Link href='/'>
        <a>
          <strong>DOWHA ADMIN</strong>
        </a>
      </Link>
    </div>
  );
};

export default HeaderTitle;
