import React from 'react';
import './ButtonGroup.scss';

const ButtonGroup = ({ children }) => {
  return (
    <div className="button-group-wrap">
      {children}
    </div>
  );
};

export default ButtonGroup;
