import React from 'react';

const ContentGroupInputGroup = ({ children }) => {
  return (
    <div className="content-group-input-group">
      {children}
    </div>
  );
};

export default React.memo(ContentGroupInputGroup);
