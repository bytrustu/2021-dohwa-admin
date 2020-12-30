import React from 'react';

const InputGroup = ({ children }) => {
  return (
    <section className="input-group-wrap">
      {children}
    </section>
  );
};

export default React.memo(InputGroup);
