// ---Dependencys
import React from 'react';
// ---Containers
import UtilityYear from 'Cont/UtilityYear';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const UtilityYearPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="UtilityYearPage" />
      <UtilityYear />
    </React.Fragment>
  );
};

export default UtilityYearPage;
