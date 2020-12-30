import React from 'react';

const UserModalTitle = ({ title='' }) => {
  return (
    <h1 className="user-title" title={title}>
      <strong>{title}</strong>
      <span>파란색 타이틀은 필수 정보 입니다</span>
    </h1>
  );
};

export default React.memo(UserModalTitle);
