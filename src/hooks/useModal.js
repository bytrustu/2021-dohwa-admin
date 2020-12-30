import React from 'react';

const useModal = ({ ModalComponent }) => {

  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState({});
  const [index, setIndex] = React.useState(null);
  const trigger = React.useRef();

  const Modal = () => ModalComponent({ data, visible, setVisible, index, beforeTrigger: trigger.current });
  const ModalConfig = ({
    modalData = {},
    index,
    beforeTrigger
  }) => {
    setVisible(true);
    setData(modalData);
    setIndex(index);
    trigger.current = beforeTrigger;
  }

  return {
    Modal,
    ModalConfig
  }
};

export default useModal;
