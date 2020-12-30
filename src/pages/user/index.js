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
import { loadUserListAPI } from '../../lib/api/user';
import useSearchInput from '../../hooks/useSearchInput';

const index = () => {
  const { Option } = Select;

  const {
    page,
    setPage,
    param,
    onClickSearch,
    onChangeKeyword,
    onChangeFilter,
  } = useSearchInput();

  const { data: userData, error, isValidating } = loadUserListAPI({ page, ...param });
  const columnData = [
    {
      title: '유형',
      dataIndex: 'type',
      ellipsis: true,
      width: 120,
    },
    {
      title: '이메일',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '이름',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      ellipsis: true,
    },
    {
      title: '생년월일',
      dataIndex: 'birthday',
      ellipsis: true,
    },
    {
      title: '활성화',
      dataIndex: 'disabled',
      ellipsis: true,
      width: 130,
    },
    {
      title: '관리자',
      dataIndex: 'role',
      ellipsis: true,
      width: 130,
    },
    {
      title: '수정',
      dataIndex: 'button',
      ellipsis: true,
      width: 130,
    }
  ];


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
        <TableData isLoading={isValidating} columnData={columnData} rowData={userData?.userList} />
        {
          userData?.count !== 0 && <Pagination page={page} setPage={setPage} total={userData?.count}/>
        }
      </Content>
    </>
  );
};

export default index;
