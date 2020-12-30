import React from 'react';

const UserModalTitle = ({ title='' }) => {
  return (
    <h1 className="question-title" title={title}>
      {title}
    </h1>
  );
};

export default React.memo(UserModalTitle);
