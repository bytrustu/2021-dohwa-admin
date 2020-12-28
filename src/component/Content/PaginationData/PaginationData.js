import React from 'react';
import './PaginationData.scss';
import { Pagination } from 'antd';


const PaginationData = ({ page, setPage, total = 0 }) => {
  const onChange = (current) => {
    setPage(current);
  }
  return (
    <div className="pagination-data-wrap">
      <Pagination current={page} total={total} onChange={onChange}/>
    </div>
  );
};

export default PaginationData;
