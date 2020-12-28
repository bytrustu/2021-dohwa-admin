import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import ButtonGroup from '../../component/Content/ButtonGroup';
import InputGroup from '../../component/Content/InputGroup';
import SmallComment from '../../component/Content/SmallComment';
import { Button, Input, Select } from 'antd';
import SearchGroup from '../../component/Content/SearchGroup';
import Content from '../../component/Content';
import TableData from '../../component/Content/TableData';
import Pagination from '../../component/Content/PaginationData';

const index = () => {
  const { Option } = Select;
  return (
    <>
      <MainTitle src="/images/maintitle/user-profile.svg" title="회원관리" />
      <Content>
        <SmallComment comment="시스템 가입시 비활성화 계정으로 등록 됩니다. ( 관리자 승인 필요 )" />
        <InputGroup>
          <SearchGroup>
            <Select defaultValue="jack">
              <Option value="jack">전체 유저</Option>
              <Option value="lucy">활성화 유저</Option>
              <Option value="Yiminghe">비활성화 유저</Option>
            </Select>
            <Input />
            <Button type="default">검색</Button>
          </SearchGroup>
          <ButtonGroup>
            <Button type="primary">추가</Button>
            <Button type="primary">계정 활성화</Button>
            <Button type="primary">관리자 지정</Button>
            <Button type="danger">계정 비활성화</Button>
            <Button type="danger">관리자 해제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData/>
        <Pagination/>
      </Content>
    </>
  );
};

export default index;
