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
import Image from 'next/image';
import useAlert from '../../hooks/useAlert';
import { deleteQuestionAPI, loadQuestionListAPI } from '../../lib/api/question';
import QuestionModal from '../../component/Modal/QuestionModal';
import useModal from '../../hooks/useModal';
import ButtonGroup from '../../component/Content/ButtonGroup';

const index = () => {

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
    MessageAlert,
    requestApiHanlder,
  } = useAlert();

  const onClickDelete = () => {
    requestApiHanlder({
      funcAPI: deleteQuestionAPI,
      title: '문의사항 삭제',
      list: questionData.list,
      targetId: 'question_id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const { response, trigger } = loadQuestionListAPI({ page, ...param });
  const { data: questionData, error, isValidating } = response;

  const columnData = [
    {
      title: '답변',
      dataIndex: 'is_answer',
      width: 80,
    },
    {
      title: '제목',
      dataIndex: 'title',
      ellipsis: true,
    },

    {
      title: '작성자',
      dataIndex: 'author',
      ellipsis: true,
      width: 300,
    },
    {
      title: '작성일시',
      dataIndex: 'create_date',
      ellipsis: true,
      width: 150,
    },
  ];

  const searchRef = React.useRef();

  const onClickAuthor = (email) => {
    setKeyword(email);
    setTimeout(() => {
      searchRef.current.click();
    }, 100);
  };

  const rowData = questionData && Array.isArray(questionData.list) ? questionData.list.map((el, i) => {
    const obj = { ...el };
    obj.title = <a onClick={() => onClickTitle(obj.question_id)}>{obj.title}</a>;
    obj.author = <a onClick={() => onClickAuthor(obj.email)}>{obj.author}</a>;
    obj.key = i;
    obj.is_answer = obj.is_answer ? <span className="success-answer">완료</span> :
      <span className="not-answer">미등록</span>;
    return obj;
  }) : [];

  const onClickTitle = (index) => {
    ModalConfig({
      index,
      beforeTrigger: trigger,
    });
  };

  const {
    Modal,
    ModalConfig,
  } = useModal({ ModalComponent: QuestionModal });

  return (
    <>
      <Modal />
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/faqs.svg" title="문의사항" />
      <Content>
        <SmallComment comment="답변이 없는 문의사항은 미답변 사항으로 표시 됩니다." />
        <InputGroup>
          <SearchGroup>
            <Select defaultValue={0} onChange={onChangeFilter}>
              <Option value={0}>전체</Option>
              <Option value={1}>답변완료</Option>
              <Option value={2}>답변미등록</Option>
            </Select>
            <Input name="keyword" onChange={onChangeKeyword} value={keyword} />
            <Button type="default" onClick={onClickSearch} ref={searchRef}>검색</Button>
          </SearchGroup>
          <ButtonGroup>
            <Button type="danger" onClick={onClickDelete}>삭제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData isLoading={isValidating} columnData={columnData} rowData={rowData} className="question-table-wrap"
                   rowSelection={rowSelection} />
        {
          questionData?.count !== 0 && <Pagination page={page} setPage={setPage} total={questionData?.count} />
        }
      </Content>
    </>
  );
};

export default index;
