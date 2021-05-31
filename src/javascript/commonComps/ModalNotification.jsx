// ---Dependencys
import { Modal } from 'antd';
// ------------------------------------------ COMPONENT-----------------------------------------
function ModalNotification(secondsToGo, title, message) {
  const modal = Modal.success({
    title,
    content: message
  });
  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
}

export default ModalNotification;
