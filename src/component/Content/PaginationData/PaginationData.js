import React from 'react';
import './PaginationData.scss';
import { Pagination } from 'antd';


const PaginationData = () => {
  return (
    <div className="pagination-data-wrap">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default PaginationData;
