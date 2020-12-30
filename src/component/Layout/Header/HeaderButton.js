import React from 'react';
import { Button } from 'antd';

const HeaderButton = ({ text, onClick }) => {
  return (
    <Button type="primary" className="button-wrap" onClick={onClick}>
      {text}
    </Button>
  );
};

export default HeaderButton;
