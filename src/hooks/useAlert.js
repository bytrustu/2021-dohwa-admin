import React from 'react';
import useInputs from './useInputs';
import ConfirmAlert from '../component/Alert/ConfirmAlert';
import { selectionArrayByIndexs } from '../lib/util';

const useAlert = () => {
  const [successView, setSuccessView] = React.useState(false);
  const [errorView, setErrorView] = React.useState(false);
  const [config, , setConfig] = useInputs({
    title: '',
    type: '',
    message: '',
    isOk: true,
    okOnClick: () => {},
    isCancel: false
  });
  const MessageAlert = ({
                          title,
                          type,
                          message,
                          isOk = true,
                          okOnClick = () => {},
                          isCancel = false,
                          isSuccess = true,
  }) => {
    if (isSuccess) {
      setSuccessView(true);
    } else {
      setErrorView(true);
    }
    setConfig({
      title: title,
      type: type,
      message: message,
      isOk: isOk,
      okOnClick: okOnClick,
      isCancel: isCancel
    })
  }

  const requestApiHanlder = async ({
                                     funcAPI,
                                     title,
                                     list,
                                     selectedRowKeys,
                                     resetSelection = () => {},
                                     trigger = () => {},
                                     targetId = ''
  }) => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    MessageAlert({
      title: `${title} 요청`,
      type: title,
      message: `${selectedRowKeys.length}개 선택, ${title} 하시겠습니까?`,
      isSuccess: true,
      isOk: true,
      okOnClick: async () => {
        try {
          const selectData = selectionArrayByIndexs(list, selectedRowKeys);
          const indexs = selectData.map(el => el[targetId]);
          const result = await funcAPI(indexs);
          resetSelection();
          trigger();
          MessageAlert({ title: `${title} 완료`, type: title, message: result.data.msg, isSuccess: true });
        } catch (e) {
          MessageAlert({ title: `${title} 실패`, type: title, message: e.response.data.msg, isSuccess: false });
        }
      },
      isCancel: true,
    });
  }

  const SuccessAlert = () => ConfirmAlert({view: successView, setView: setSuccessView, config, isSuccess: true});
  const ErrorAlert = () => ConfirmAlert({view: errorView, setView: setErrorView, config, isSuccess: false});

  return {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
    requestApiHanlder,
  }
};

export default useAlert;
