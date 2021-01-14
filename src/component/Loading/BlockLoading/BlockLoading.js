import React from 'react';
import PageLoading from '../PageLoading';

const BlockLoading = ({ view }) => (
  view &&
  <div className="ant-modal-mask" style={{ zIndex: 10000}}>
    <PageLoading/>
  </div>
)
export default BlockLoading;
