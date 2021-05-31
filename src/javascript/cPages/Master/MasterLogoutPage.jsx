// ---Dependencys
import React from 'react';
// ---Components
import MasterLogoutCont from 'Cont/Master/MasterLogoutCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLogoutPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="LogOut" />
      <MasterLogoutCont />
    </React.Fragment>
  );
};

export default MasterLogoutPage;
