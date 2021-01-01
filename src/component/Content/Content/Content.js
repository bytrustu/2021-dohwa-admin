import React from 'react';

const Content = ({ children, style }) => {
  return (
    <div className="content-wrap" style={style}>
      {children}
    </div>
  );
};

export default React.memo(Content);
