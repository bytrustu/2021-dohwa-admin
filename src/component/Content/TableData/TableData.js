import React from 'react';
import { Button, Table } from 'antd';
import Image from 'next/image'

const TableData = ({isLoading, columnData = [], rowData = [], className, rowSelection}) => {

  // const dataSource = rowData.map((el, i) => {
  //   const obj = {...el};
  //   obj.key = i;
  //   const type = {
  //     email: '이메일',
  //     kakao: '카카오',
  //     google: '구글',
  //     naver: '네이버'
  //   }
  //   obj.type = type[obj.type];
  //   obj.disabled = obj.disabled === 0 ? <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
  //   obj.role = obj.role === 1 ? <Image src='/images/content/check.svg' alt="체크이미지" width={15} height={15} /> : '';
  //   obj.button = <Button type="disabled"><Image src='/images/content/write.svg' alt='이미지' width={20} height={20} /></Button>
  //   return obj;
  // });

  return (
    <div className="table-data-wrap">
      <Table className={className} rowSelection={rowSelection} columns={columnData} dataSource={rowData} size="middle" pagination={false} loading={isLoading}/>
    </div>
  );
};

export default React.memo(TableData);
