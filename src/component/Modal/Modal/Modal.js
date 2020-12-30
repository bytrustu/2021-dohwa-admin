import React from 'react';
import { Modal } from 'antd';

const BasicModal = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Modal
      title="가나다라"
      visible={visible}
      onOk={() => {setVisible(false)}}
      onCancel={() => {setVisible(false)}}
      centered={true}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default BasicModal;
