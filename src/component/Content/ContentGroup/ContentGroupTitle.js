import React from 'react';

const ContentGroupTitle = ({ title = '' }) => {
  return (
    <div className="content-group-title">
      <h4>{title}</h4>
    </div>
  );
};

export default React.memo(ContentGroupTitle);
