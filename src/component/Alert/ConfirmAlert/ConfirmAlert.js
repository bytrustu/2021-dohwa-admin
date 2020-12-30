import React from 'react';
import { Button } from 'antd';

const ConfirmAlert = (
  {
    view = false,
    setView = () => {},
    config,
    isSuccess = true,
  },
) => {
  const {
    title = '확인',
    type,
    message,
    isOk = true,
    okText = '확인',
    okOnClick,
    isCancel = false,
    cancelText = '취소',
  } = config;

  const onClickOk = () => {
    setView(false);
    okOnClick && okOnClick();
  }

  const onClickCancel = () => {
    setView(false);
  }

  return (
    view &&
    <div className="confirm-alert">
      <header className='confirm-alert-header'>
        <h5 className='confirm-alert-title'>{title}</h5>
      </header>
      <div className="confirm-alert-body">
        <div className={`confirm-alert-content ${isSuccess && 'success'}`}>
          <h5>분류 : {type}</h5>
          <h5>{message}</h5>
        </div>
      </div>
      <footer className='confirm-alert-footer'>
        {
          isCancel && <Button type='default' onClick={onClickCancel}>{cancelText}</Button>
        }
        {
          isOk && <Button type='primary' onClick={onClickOk}>{okText}</Button>
        }
      </footer>
    </div>
  );
};

export default ConfirmAlert;
