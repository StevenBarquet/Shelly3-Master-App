// ---Dependencys
import React from 'react';
// ---Components
import HomeMasterCont from 'Cont/Master/HomeMasterCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const HomePageMaster = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="HomeMaster" />
      <HomeMasterCont />
    </React.Fragment>
  );
};

export default HomePageMaster;
