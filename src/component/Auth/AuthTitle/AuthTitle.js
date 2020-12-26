import React from 'react';
import style from './AuthTitle.module.scss'

const AuthTitle = () => {
  return (
    <div className={style.titleWrap}>
      <h2 className={style.titleMain}>도화 어드민</h2>
      <p className={style.titleSub}>"도화 어드민" 은 관리자만 이용 가능 합니다.</p>
    </div>
  );
};

export default AuthTitle;
