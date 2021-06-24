// ---Dependencys
import React from 'react';
// ---Components
import LogoutCont from 'Cont/LogoutCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLogoutPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="LogOut" />
      <LogoutCont />
    </React.Fragment>
  );
};

export default MasterLogoutPage;
