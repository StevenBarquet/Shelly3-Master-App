// ---Dependencys
import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

// ------------------------------------------ COMPONENT-----------------------------------------
function CloseButton(props) {
  const { onDeleteButton, value, estilo } = props;
  return (
    <button
      className={estilo || 'close-button'}
      type="button"
      value={value}
      onClick={() => onDeleteButton(value)}
    >
      <CloseCircleFilled />
    </button>
  );
}

export default CloseButton;
