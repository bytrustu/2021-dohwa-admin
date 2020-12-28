import React from 'react';
import './SearchGroup.scss';

const SearchGroup = ({ children }) => {
  return (
    <div className="search-group-wrap">
      {children}
    </div>
  );
};

export default SearchGroup;
