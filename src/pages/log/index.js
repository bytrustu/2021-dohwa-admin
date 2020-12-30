import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import { DatePicker, Space, Tabs } from 'antd';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import TableData from '../../component/Content/TableData';

const index = () => {

  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <MainTitle src="/images/maintitle/log-file.svg" title="로그" />
      <Content>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="접속이력" key="1">
            <InputGroup>
              <SearchGroup>
                <Space direction="vertical" size={12}>
                  <RangePicker />
                </Space>
              </SearchGroup>
            </InputGroup>
          </TabPane>
          <TabPane tab="상품점수" key="2">
            <InputGroup>
              <SearchGroup>
                <Space direction="vertical" size={12}>
                  <RangePicker />
                </Space>
              </SearchGroup>
            </InputGroup>
          </TabPane>
        </Tabs>
      </Content>
    </div>
  );
};

export default index;
