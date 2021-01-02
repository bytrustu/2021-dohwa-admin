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
import {
  activeUsersAPI,
  adminUsersAPI,
  disabledUsersAPI,
  findUserAPI,
  loadUserListAPI,
  normalUsersAPI,
} from '../../lib/api/user';
import useSearchInput from '../../hooks/useSearchInput';
import Image from 'next/image';
import useAlert from '../../hooks/useAlert';
import useModal from '../../hooks/useModal';
import UserModal from '../../component/Modal/UserModal';
import { converDate } from '../../lib/util';

const index = () => {
  const { Option } = Select;

  const {
    page,
    setPage,
    param,
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

  const onClickActiveUsers = () => {
    requestApiSelectedHanlder({
      funcAPI: activeUsersAPI,
      title: '계정 활성화 설정',
      list: userData.list,
      targetId: 'id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const onClickDisabledUsers = () => {
    requestApiSelectedHanlder({
      funcAPI: disabledUsersAPI,
      title: '계정 비활성화 설정',
      list: userData.list,
      targetId: 'id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const onClickAdminUsers = () => {
    requestApiSelectedHanlder({
      funcAPI: adminUsersAPI,
      title: '계정 관리자 설정',
      list: userData.list,
      targetId: 'id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const onClickNormalUsers = () => {
    requestApiSelectedHanlder({
      funcAPI: normalUsersAPI,
      title: '계정 일반회원 설정',
      list: userData.list,
      targetId: 'id',
      selectedRowKeys,
      resetSelection,
      trigger,
    });
  };

  const {
    Modal,
    ModalConfig,
  } = useModal({ ModalComponent: UserModal });

  const onClickAddUser = () => {
    const modalData = {
      form: [
        { type: 'text', name: 'email', label: '이메일', placeholder: '이메일', required: true },
        { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호 (8자 이상)', required: true },
        { type: 'text', name: 'name', label: '이름', placeholder: '이름 (15자 이하)', required: true },
        { type: 'text', name: 'phone', label: '연락처', placeholder: '연락처 (01012341234)', required: false },
        { type: 'text', name: 'birthday', label: '생년월일', placeholder: '생년월일 (1990-01-01)', required: false },
      ],
      info: {
        type: '등록',
        focus: 'email'
      }
    }
    ModalConfig({ modalData, beforeTrigger: trigger });
  };

  const onClickEditUser = async (id) => {
    try {
      const { data } = await findUserAPI(id);
      const modalData = {
        form: [
          { type: 'text', name: 'email', label: '이메일', placeholder: '이메일', required: true, readonly: true },
          { type: 'password', name: 'password', label: '비밀번호', placeholder: '비밀번호 (8자 이상)', required: false, readonly: false },
          { type: 'text', name: 'name', label: '이름', placeholder: '이름 (15자 이하)', required: true, readonly: false },
          { type: 'text', name: 'phone', label: '연락처', placeholder: '연락처 (01012341234)', required: false, readonly: false },
          { type: 'text', name: 'birthday', label: '생년월일', placeholder: '생년월일 (1990-01-01)', required: false, readonly: false },
        ],
        info: {
          type: '수정',
          focus: 'password',
        },
        user: {
          ...data,
          birthday: converDate(data.birthday)
        }
      }
      ModalConfig({ modalData, beforeTrigger: trigger });
    } catch (e) {
      MessageAlert({
        title: '회원 정보 열람 실패',
        type: '회원 정보 열람',
        message: e.response.data.msg,
        isSuccess: false,
      });
    }

  }


  const { response: { data: userData, error, isValidating }, trigger } = loadUserListAPI({ page, ...param });
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
    },
  ];

  const rowData = Array.isArray(userData?.list) ? userData.list.map((el, i) => {
    const obj = { ...el };
    obj.key = i;
    const type = {
      email: '이메일',
      kakao: '카카오',
      google: '구글',
      naver: '네이버',
    };
    obj.type = type[obj.type];
    obj.disabled = obj.disabled === 0 ?
      <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
    obj.role = obj.role === 1 ? <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
    obj.button =
      <Button type="disabled" onClick={() => onClickEditUser(obj.id)}><Image src='/images/content/write.svg' alt='이미지' width={20} height={20} /></Button>;
    return obj;
  }) : [];

  return (
    <>
      <Modal />
      <SuccessAlert />
      <ErrorAlert />
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
            <Button type="primary" onClick={onClickAddUser}>계정 등록</Button>
            <Button type="primary" onClick={onClickActiveUsers}>계정 활성화</Button>
            <Button type="primary" onClick={onClickAdminUsers}>관리자 지정</Button>
            <Button type="danger" onClick={onClickDisabledUsers}>계정 비활성화</Button>
            <Button type="danger" onClick={onClickNormalUsers}>관리자 해제</Button>
          </ButtonGroup>
        </InputGroup>
        <TableData isLoading={isValidating} columnData={columnData} rowData={rowData} rowSelection={rowSelection} />
        {
          userData?.count !== 0 && <Pagination page={page} setPage={setPage} total={userData?.count} />
        }
      </Content>
    </>
  );
};

export default index;
