import React from 'react';

const Content = ({ children }) => {
  return (
    <div className="content-wrap">
      {children}
    </div>
  );
};

export default React.memo(Content);
