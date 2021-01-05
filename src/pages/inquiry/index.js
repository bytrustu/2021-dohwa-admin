import React  from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import { Button, Input, Modal, Select } from 'antd';
import SmallComment from '../../component/Content/SmallComment';
import TableData from '../../component/Content/TableData';
import Pagination from '../../component/Content/PaginationData/PaginationData';
import useSearchInput from '../../hooks/useSearchInput';
import useAlert from '../../hooks/useAlert';
import ButtonGroup from '../../component/Content/ButtonGroup';
import { useRouter } from 'next/router';
import { loadInquiryListAPI, deleteInquiryAPI } from '../../lib/api/inquiry';

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

  const onClickTitle = (index) => {
    router.push(`/inquiry/${index}`)
  };

  const onClickDeleteInquiry = () => {
    requestApiSelectedHanlder({
      funcAPI: deleteInquiryAPI,
      title: '문진 삭제',
      list: inquiryData.list,
      targetId: 'survey_id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const { response, trigger } = loadInquiryListAPI({ page, ...param });
  const { data: inquiryData, error, isValidating } = response;

  const columnData = [
    {
      title: '피부유형',
      dataIndex: 'result',
      width: 150,
    },
    {
      title: '고민선택',
      dataIndex: 'selection_question',
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

  const rowData = inquiryData && Array.isArray(inquiryData.list) ? inquiryData.list.map((el, i) => {
    const obj = { ...el };
    obj.result = <a href="#" onClick={() => onClickTitle(obj.survey_id)}>{obj.result}</a>;
    obj.selection_question = <a href="#" onClick={() => onClickTitle(obj.survey_id)}>{obj.selection_question}</a>;
    obj.author = <a href="#" onClick={() => {}}>{obj.author}</a>;
    obj.key = i;
    return obj;
  }) : [];


  return (
    <>
      <Modal />
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/skincare.svg" title="피부리포트" />
      <Content>
        <SmallComment comment="피부리포트 검색은 작성자 이름, 이메일로 가능 합니다." />
        <InputGroup>
          <SearchGroup>
            <Input name="keyword" onChange={onChangeKeyword} value={keyword} />
            <Button type="default" onClick={onClickSearch} ref={searchRef}>검색</Button>
          </SearchGroup>
          <ButtonGroup>
            <Button type="danger" onClick={onClickDeleteInquiry}>문진 삭제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData
          isLoading={isValidating}
          columnData={columnData}
          rowData={rowData}
          className="event-table-wrap"
          rowSelection={rowSelection} />
        {
          inquiryData?.count !== 0 && <Pagination page={page} setPage={setPage} total={inquiryData?.count} />
        }
      </Content>
    </>
  );
};

export default index;
