import React from 'react';
import useInputs from './useInputs';
import ConfirmAlert from '../component/Alert/ConfirmAlert';

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
  const SuccessAlert = () => ConfirmAlert({view: successView, setView: setSuccessView, config, isSuccess: true});
  const ErrorAlert = () => ConfirmAlert({view: errorView, setView: setErrorView, config, isSuccess: false});
  return {
    SuccessAlert: SuccessAlert,
    ErrorAlert: ErrorAlert,
    MessageAlert: MessageAlert
  }
};

export default useAlert;
