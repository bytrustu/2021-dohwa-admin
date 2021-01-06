import React from 'react';

const ContentGroupInputGroup = ({ children, style }) => {
  return (
    <div className="content-group-input-group" style={style}>
      {children}
    </div>
  );
};

export default React.memo(ContentGroupInputGroup);
