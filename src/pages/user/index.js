import React from 'react';
import { Button, Input, Select } from 'antd';
import MainTitle from '../../component/Content/MainTitle';
import ButtonGroup from '../../component/Content/ButtonGroup';
import InputGroup from '../../component/Content/InputGroup';
import SmallComment from '../../component/Content/SmallComment';
import SearchGroup from '../../component/Content/SearchGroup';
import Content from '../../component/Content';
import TableData from '../../component/Content/TableData';
import Pagination from '../../component/Content/PaginationData';
import { loadUserList } from '../../lib/api/user';

const index = () => {
  const { Option } = Select;

  const [keyword, setKeyword] = React.useState('');
  const [filter, setFilter] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [param, setParam] = React.useState({
    keyword: '',
    filter: 0,
  });

  const onClickSearch = () => {
    setPage(1);
    setParam({
      keyword,
      filter,
    });
  }

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const onChangeFilter = (value) => {
    setFilter(value);
  }

  const { data: userData, error, isValidating } = loadUserList({ page, ...param });

  return (
    <>
      <MainTitle src="/images/maintitle/user-profile.svg" title="회원관리" />
      <Content>
        <SmallComment comment="시스템 가입시 비활성화 계정으로 등록 됩니다. ( 관리자 승인 필요 )" />
        <InputGroup>
          <SearchGroup>
            <Select defaultValue={0} onChange={onChangeFilter}>
              <Option value={0}>전체 유저</Option>
              <Option value={1}>활성화 유저</Option>
              <Option value={2}>비활성화 유저</Option>
            </Select>
            <Input name="keyword" onChange={onChangeKeyword} />
            <Button type="default" onClick={onClickSearch}>검색</Button>
          </SearchGroup>
          <ButtonGroup>
            <Button type="primary">추가</Button>
            <Button type="primary">계정 활성화</Button>
            <Button type="primary">관리자 지정</Button>
            <Button type="danger">계정 비활성화</Button>
            <Button type="danger">관리자 해제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData isLoading={isValidating} data={userData?.userList} />
        {
          userData?.count !== 0 && <Pagination page={page} setPage={setPage} total={userData?.count}/>
        }
      </Content>
    </>
  );
};

export default index;
