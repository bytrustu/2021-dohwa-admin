import React from 'react';
import { Button, Table } from 'antd';
import Image from 'next/image'

const TableData = ({isLoading, columnData = [], rowData = [], className, rowSelection}) => {

  return (
    <div className="table-data-wrap">
      <Table className={className} rowSelection={rowSelection} columns={columnData} dataSource={rowData} size="middle" pagination={false} loading={isLoading}/>
    </div>
  );
};

export default React.memo(TableData);
