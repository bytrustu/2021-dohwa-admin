import React from 'react';

const ContentGroupInput = ({ title = '', style, children }) => {
  return (
    <div className="content-group-input" style={style}>
      <h5>{title}</h5>
      {children}
    </div>
  );
};

export default React.memo(ContentGroupInput);
