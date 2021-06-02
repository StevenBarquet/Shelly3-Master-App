// ---Dependencys
import React from 'react';
// ---Containers
import UtilityCont from 'Cont/UtilityCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const UtilityDayPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="UtilityDayPage" />
      <UtilityCont />
    </React.Fragment>
  );
};

export default UtilityDayPage;
