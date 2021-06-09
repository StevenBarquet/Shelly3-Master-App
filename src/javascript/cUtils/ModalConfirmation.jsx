// ---Dependencys
import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

// ------------------------------------------ COMPONENT-----------------------------------------
function ModalConfirmation(question, details, callback, data) {
  confirm({
    title: question,
    icon: <ExclamationCircleOutlined />,
    content: details,
    onOk() {
      if (data) callback(data);
      else callback();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}
export default ModalConfirmation;
