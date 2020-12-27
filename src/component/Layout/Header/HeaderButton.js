import React from 'react';
import './Header.scss';
import { Button } from 'antd';

const HeaderButton = ({ text, onClick }) => {
  return (
    <Button type="primary" className="button-wrap" onClick={onClick}>
      {text}
    </Button>
  );
};

export default HeaderButton;
