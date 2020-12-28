import React from 'react';
import './TableData.scss';
import { Button, Table } from 'antd';
import Image from 'next/image'

const TableData = ({isLoading, data = []}) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const columns = [
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

  const dataSource = data.map((el, i) => {
    const obj = {...el};
    obj.key = i;
    const type = {
      email: '이메일',
      kakao: '카카오',
      google: '구글',
      naver: '네이버'
    }
    obj.type = type[obj.type];
    obj.disabled = obj.disabled === 0 ? <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
    obj.role = obj.role === 1 ? <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
    obj.button = <Button type="disabled"><Image src='/images/content/write.svg' alt='이미지' width={20} height={20} /></Button>
    return obj;
  });

  console.log(data, `>>>>>>>`);

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className="table-data-wrap user-table-wrap">
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} size="middle" pagination={false} loading={isLoading}/>
    </div>
  );
};

export default TableData;
