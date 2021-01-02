import React, { useState } from 'react';

const useSearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [param, setParam] = useState({
    keyword: '',
    filter: 0,
  });

  const onClickSearch = () => {
    resetSelection();
    setPage(1);
    setParam({
      keyword,
      filter,
    });
  };

  const onChangeKeyword = (e) => setKeyword(e.target.value);

  const onChangeFilter = (value) => {
    setFilter(value);
  }

  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const resetSelection = () => {
    setSelectedRowKeys([]);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  React.useEffect(() => {
    resetSelection()
  }, [page])

  return {
    page,
    setPage,
    param,
    keyword,
    setKeyword,
    onClickSearch,
    onChangeKeyword,
    onChangeFilter,
    rowSelection,
    selectedRowKeys,
    resetSelection,
  };


};

export default useSearchInput;