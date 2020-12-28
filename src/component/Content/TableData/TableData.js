import React from 'react';
import './TableData.scss';
import { Button, Table } from 'antd';
import { EditOutlined, UserSwitchOutlined, CheckSquareTwoTone } from '@ant-design/icons';
import Image from 'next/image'

const TableData = () => {

  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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

  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      email: 'test1@gmail.com',
      type: '이메일',
      name: `Edward King ${i}`,
      phone: '01021112222',
      birthday: '1989-12-02',
      disabled: <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} />,
      role: <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} />,
      button: <Button type="disabled"><Image src='/images/content/write.svg' alt='이미지' width={20} height={20} /></Button>
    });
  }

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="middle" pagination={false}/>
    </div>
  );
};

export default TableData;
