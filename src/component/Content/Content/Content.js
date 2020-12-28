import React from 'react';
import './Content.scss';

const Content = ({ children }) => {
  return (
    <div className="content-wrap">
      {children}
    </div>
  );
};

export default Content;
