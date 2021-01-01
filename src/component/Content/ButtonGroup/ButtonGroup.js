import React from 'react';

const ButtonGroup = ({ children }) => {
  return (
    <div className="button-group-wrap">
      {children}
    </div>
  );
};

export default React.memo(ButtonGroup);
