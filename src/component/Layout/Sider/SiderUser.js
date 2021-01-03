import React from 'react';
import { loadUserListAPI } from '../../../lib/api/auth';

const SiderUser = () => {
  const { response: { data: userData, error, isValidating }, trigger } = loadUserListAPI();
  return (
    <div className="user-wrap">
      <span>{userData?.name} 님</span>
    </div>
  );
};

export default React.memo(SiderUser);
