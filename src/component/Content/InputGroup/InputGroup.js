import React from 'react';
import './InputGroup.scss';

const InputGroup = ({ children }) => {
  return (
    <section className="input-group-wrap">
      {children}
    </section>
  );
};

export default InputGroup;
