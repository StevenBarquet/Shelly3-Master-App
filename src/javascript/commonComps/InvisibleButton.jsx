// ---Dependencys
import React from 'react';
// ------------------------------------------ COMPONENT-----------------------------------------
const InvisibleButton = props => {
  const { callback } = props;
  return (
    <button
      type="button"
      onClick={callback}
      tabIndex={0}
      className="invisible-button"
    />
  );
};

export default InvisibleButton;
