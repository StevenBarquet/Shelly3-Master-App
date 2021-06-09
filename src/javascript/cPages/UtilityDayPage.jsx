// ---Dependencys
import React from 'react';
// ---Containers
import UtilityDay from 'Cont/UtilityDay';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const UtilityDayPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="UtilityDayPage" />
      <UtilityDay />
    </React.Fragment>
  );
};

export default UtilityDayPage;
