// ---Dependencys
import React from 'react';
// ---Components
import AuthValidate from 'Cont/Master/AuthValidate';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const ToHomeMasterPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="ToHomeMasterPage" />
      <AuthValidate />
    </React.Fragment>
  );
};

export default ToHomeMasterPage;
