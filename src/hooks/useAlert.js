import React from 'react';
import useInputs from './useInputs';
import ConfirmAlert from '../component/Alert/ConfirmAlert';

const useAlert = () => {
  const [view, setView] = React.useState(false);
  const [config, , setConfig] = useInputs({
    title: '',
    type: '',
    message: '',
    isOk: true,
    okOnClick: () => {},
    isCancel: false
  });
  const AlertComponent = () => ConfirmAlert({view, setView, config});
  return [setView, setConfig, AlertComponent];
};

export default useAlert;
