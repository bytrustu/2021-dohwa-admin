import React from 'react';
import { Skeleton, Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Status from '../Status';


const StatusGroup = () => {

  return (
    <div className="site-card-wrapper status-group-wrap">
      <Row gutter={40}>
        <Col span={8}>
          <Status title="접속자 현황"/>
        </Col>
        <Col span={8}>
          <Status title="피부리포트 현황"/>
        </Col>
        <Col span={8}>
          <Status title="추천이용 현황"/>
        </Col>
      </Row>
    </div>
  );
};

export default StatusGroup;
