import React from 'react';
import useInputs from './useInputs';
import ConfirmAlert from '../component/Alert/ConfirmAlert';
import { selectionArrayByIndexs } from '../lib/util';
import BlockLoading from '../component/Loading/BlockLoading';

const useAlert = () => {
  const [successView, setSuccessView] = React.useState(false);
  const [errorView, setErrorView] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [config, , setConfig] = useInputs({
    title: '',
    type: '',
    message: '',
    isOk: true,
    okOnClick: () => {
    },
    isCancel: false,
  });
  const MessageAlert = ({
                          title,
                          type,
                          message,
                          isOk = true,
                          okOnClick = () => {
                          },
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
      isCancel: isCancel,
    });
  };

  const requestApiHanlder = async (
    {
      funcAPI = () => {
      },
      data = {},
      title = '',
      afterAction = () => {
      },
    },
  ) => {
    try {
      const result = await funcAPI(data);
      MessageAlert({
        title: `${title} 완료`,
        type: title,
        message: result.data.msg,
        isSuccess: true,
        okOnClick: () => {
          afterAction();
        },
      });
    } catch (e) {
      MessageAlert({
        title: `${title} 실패`,
        type: title,
        message: e.response.data.msg,
        isSuccess: false,
      });
    }
  };

  const requestApiConfirmHanlder = (
    {
      funcAPI = () => {
      },
      data = {},
      title = '',
      afterAction = () => {
      },
    },
  ) => {
    MessageAlert({
      title: `${title} 요청`,
      type: title,
      message: `${title} 하시겠습니까?`,
      isSuccess: true,
      isOk: true,
      okOnClick: async () => {
        try {
          setLoading(true);
          const result = await funcAPI(data);
          setLoading(false);
          MessageAlert({
            title: `${title} 완료`,
            type: title,
            message: result.data.msg,
            isSuccess: true,
            okOnClick: () => {
              afterAction();
            },
          });
        } catch (e) {
          MessageAlert({
            title: `${title} 실패`,
            type: title,
            message: e.response.data.msg,
            isSuccess: false,
          });
        }
      },
      isCancel: true,
    });



  };


  const requestApiSelectedHanlder = async (
    {
      funcAPI,
      title,
      list,
      selectedRowKeys,
      resetSelection = () => {
      },
      trigger = () => {
      },
      targetId = '',
    }
  ) => {
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
  };

  const SuccessAlert = () => ConfirmAlert({ view: successView, setView: setSuccessView, config, isSuccess: true });
  const ErrorAlert = () => ConfirmAlert({ view: errorView, setView: setErrorView, config, isSuccess: false });
  const AlertLoading = () => BlockLoading({ view: loading });

  return {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
    requestApiHanlder,
    requestApiConfirmHanlder,
    requestApiSelectedHanlder,
    AlertLoading,
  };
};

export default useAlert;
