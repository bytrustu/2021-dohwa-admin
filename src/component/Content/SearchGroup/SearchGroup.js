import React from 'react';

const SearchGroup = ({ children }) => {
  return (
    <div className="search-group-wrap">
      {children}
    </div>
  );
};

export default React.memo(SearchGroup);
