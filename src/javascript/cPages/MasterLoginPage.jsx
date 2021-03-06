// ---Dependencys
import React from 'react';
// ---Components
import LoginCont from 'Cont/LoginCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLoginPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="Login" />
      <LoginCont />
    </React.Fragment>
  );
};

export default MasterLoginPage;
