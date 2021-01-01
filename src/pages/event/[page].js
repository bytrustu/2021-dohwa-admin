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
import { useRouter } from 'next/router';

const index = () => {

  const router = useRouter();
  console.log(router.query);

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
    requestApiSelectedHanlder,
  } = useAlert();

  const onClickDelete = () => {
    requestApiSelectedHanlder({
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

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/event.svg" title="이벤트 보기" />
      <Content>

      </Content>
    </>
  );
};

export default index;
