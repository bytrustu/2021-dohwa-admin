import React from 'react';
import Link from 'next/link';

const FooterLink = ({ text, children }) => {
  return (
    <a className="link-text" href={''}>
      {
        text && (
          <span>{text}</span>
        )
      }
      {
        children && (
          <span>{children}</span>
        )
      }
    </a>
  );
};

export default React.memo(FooterLink);
