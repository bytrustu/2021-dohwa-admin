import React, { useState } from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import { Button, Input, Modal, Select, Skeleton } from 'antd';
import SmallComment from '../../component/Content/SmallComment';
import TableData from '../../component/Content/TableData';
import Pagination from '../../component/Content/PaginationData/PaginationData';
import useSearchInput from '../../hooks/useSearchInput';
import useAlert from '../../hooks/useAlert';
import QuestionModal from '../../component/Modal/QuestionModal';
import useModal from '../../hooks/useModal';
import ButtonGroup from '../../component/Content/ButtonGroup';
import { useRouter } from 'next/router';
import { deleteEventAPI, loadEventListAPI } from '../../lib/api/event';

const index = () => {

  const router = useRouter();

  const { Option } = Select;

  const {
    page,
    setPage,
    param,
    keyword,
    setKeyword,
    onChangeFilter,
    onChangeKeyword,
    onClickSearch,
    rowSelection,
    selectedRowKeys,
    resetSelection,
  } = useSearchInput();

  const {
    SuccessAlert,
    ErrorAlert,
    requestApiSelectedHanlder,
  } = useAlert();

  const onClickWriteEvent = () => {
    router.push('/event/write');
  };

  const onClickTitle = (index) => {
    router.push(`/event/${index}`)
  };

  const onClickDeleteEvent = () => {
    requestApiSelectedHanlder({
      funcAPI: deleteEventAPI,
      title: '문의사항 삭제',
      list: eventData.list,
      targetId: 'event_id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const { response, trigger } = loadEventListAPI({ page, ...param });
  const { data: eventData, error, isValidating } = response;

  const columnData = [
    {
      title: '진행여부',
      dataIndex: 'is_progress',
      width: 80,
    },
    {
      title: '제목',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '유형',
      dataIndex: 'type',
      width: 120,
    },
    {
      title: '기간',
      dataIndex: 'progress_date',
      ellipsis: true,
      width: 200,
    },
    {
      title: '등록일시',
      dataIndex: 'create_date',
      ellipsis: true,
      width: 150,
    },
  ];

  const searchRef = React.useRef();

  const rowData = eventData && Array.isArray(eventData.list) ? eventData.list.map((el, i) => {
    const obj = { ...el };
    obj.title = <a onClick={() => onClickTitle(1)}>{obj.title}</a>;
    obj.key = i;
    obj.is_progress = obj.is_progress ?
      <span className="progress">진행중</span>
      :
      <span className="not-progress">미진행</span>
    return obj;
  }) : [];


  return (
    <>
      <Modal />
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/event.svg" title="이벤트" />
      <Content>
        <SmallComment comment="이벤트 진행여부는 현재 날짜 기준으로 기간 내에 포함되면 진행중으로 결정 됩니다." />
        <InputGroup>
          <SearchGroup>
            <Select defaultValue={0} onChange={onChangeFilter}>
              <Option value={0}>전체</Option>
              <Option value={1}>진행중</Option>
              <Option value={2}>진행완료</Option>
            </Select>
            <Input name="keyword" onChange={onChangeKeyword} value={keyword} />
            <Button type="default" onClick={onClickSearch} ref={searchRef}>검색</Button>
          </SearchGroup>
          <ButtonGroup>
            <Button type="primary" onClick={onClickWriteEvent}>이벤트 등록</Button>
            <Button type="danger" onClick={onClickDeleteEvent}>이벤트 삭제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData
          isLoading={isValidating}
          columnData={columnData}
          rowData={rowData}
          className="event-table-wrap"
          rowSelection={rowSelection} />
        {
          eventData?.count !== 0 && <Pagination page={page} setPage={setPage} total={eventData?.count} />
        }
      </Content>
    </>
  );
};

export default index;
