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
import { useRouter } from 'next/router';
import { loadProductListAPI } from '../../lib/api/product';

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
  } = useSearchInput();

  const {
    SuccessAlert,
    ErrorAlert,
  } = useAlert();

  const onClickTitle = (index) => {
    router.push(`/product/${index}`)
  };

  const { response, trigger } = loadProductListAPI({ page, ...param });
  const { data: productData, error, isValidating } = response;

  const columnData = [
    {
      title: '대분류',
      dataIndex: 'category',
      width: 150,
    },
    {
      title: '소분류',
      dataIndex: 'type',
      width: 150,
      ellipsis: true,
    },
    {
      title: '이름',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '브랜드',
      dataIndex: 'brand',
      ellipsis: true,
      width: 250,
    },
    {
      title: '화장품 번호',
      dataIndex: 'num',
      width: 150,
    },
    {
      title: '점수',
      dataIndex: 'rating',
      width: 150,
    },
    {
      title: '가격',
      dataIndex: 'cost',
      ellipsis: true,
      width: 150,
    },
    {
      title: '용량',
      dataIndex: 'volume',
      ellipsis: true,
      width: 150,
    },
    {
      title: '링크',
      dataIndex: 'link',
      ellipsis: true,
      width: 150,
    },
  ];

  const searchRef = React.useRef();

  const rowData = productData && Array.isArray(productData.list) ? productData.list.map((el, i) => {
    const obj = { ...el };
    obj.category = <a onClick={() => onClickTitle(el.product_id)}>{obj.category}</a>;
    obj.type = <a onClick={() => onClickTitle(el.product_id)}>{obj.type}</a>;
    obj.name = <a onClick={() => onClickTitle(el.product_id)}>{obj.name}</a>;
    obj.link = <a href={el.link} target="_blank"><img src="/images/product/link.svg" width={15} alt="링크아이콘"/></a>;

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
      <MainTitle src="/images/maintitle/product-design.svg" title="제품정보" />
      <Content>
        <SmallComment comment="제품정보 검색은 대분류, 소분류, 이름, 브랜드, 화장품번호, 가격, 전성분 으로 검색 됩니다." />
        <InputGroup>
          <SearchGroup>
            <Select defaultValue={0} onChange={onChangeFilter}>
              <Option value={0}>전체</Option>
              <Option value={1}>점수높은순</Option>
              <Option value={2}>점수낮은순</Option>
            </Select>
            <Input name="keyword" onChange={onChangeKeyword} value={keyword} />
            <Button type="default" onClick={onClickSearch} ref={searchRef}>검색</Button>
          </SearchGroup>
        </InputGroup>
        <TableData
          isLoading={isValidating}
          columnData={columnData}
          rowData={rowData}
          className="event-table-wrap" />
        {
          productData?.count !== 0 && <Pagination page={page} setPage={setPage} total={productData?.count} />
        }
      </Content>
    </>
  );
};

export default index;
