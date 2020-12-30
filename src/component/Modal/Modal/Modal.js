import React from 'react';
import { Modal } from 'antd';

const BasicModal = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Modal
      title="테스트"
      visible={visible}
      onOk={() => {setVisible(false)}}
      onCancel={() => {setVisible(false)}}
      centered={true}
    >
    </Modal>
  );
};

export default BasicModal;
