// ---Dependencys
import { Modal } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';

const { error } = Modal;

// ------------------------------------------ COMPONENT-----------------------------------------
function ModalError(title, details) {
  error({
    title,
    // icon: <ExclamationCircleOutlined />,
    content: details
  });
}
export default ModalError;
