// ---Dependencys
import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

// ------------------------------------------ COMPONENT-----------------------------------------
function CloseButton(props) {
  const { onDeleteButton, value } = props;
  console.log('CloseButton', props);
  return (
    <button
      className="close-button"
      type="button"
      value={value}
      onClick={() => onDeleteButton(value)}
    >
      <CloseCircleFilled />
    </button>
  );
}

export default CloseButton;
