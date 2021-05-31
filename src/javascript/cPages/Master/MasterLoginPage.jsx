// ---Dependencys
import React from 'react';
// ---Components
import MasterLoginCont from 'Cont/Master/MasterLoginCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLoginPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="Login" />
      <MasterLoginCont />
    </React.Fragment>
  );
};

export default MasterLoginPage;
