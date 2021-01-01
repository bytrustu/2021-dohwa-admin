import React from 'react';

const ContentGroupInput = ({ title = '', children }) => {
  return (
    <div className="content-group-input">
      <h5>{title}</h5>
      {children}
    </div>
  );
};

export default React.memo(ContentGroupInput);
