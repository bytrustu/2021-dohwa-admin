import React from 'react';
import { Card } from 'antd';
import StatusContent from '../StatusContent';


const Status = ({ title }) => {
  return (
    <Card className="status-card" title={title}>
      <StatusContent type="up" value="1553" percent="3%" currentDate="01월 06일" text="1일전 3000명"/>
      <StatusContent type="down" value="1020" percent="3%" currentDate="01월 06일 ~ 02일" text="1주 전 2000명"/>
      <StatusContent type="up" value="1888" percent="3%" currentDate="02월" text="1달 전 3500명"/>
    </Card>
  );
};

export default React.memo(Status);
