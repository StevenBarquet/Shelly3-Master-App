// ---Dependencys
import React from 'react';
// ---Containers
import UtilityMonth from 'Cont/UtilityMonth';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const UtilityMonthPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="UtilityMonthPage" />
      <UtilityMonth />
    </React.Fragment>
  );
};

export default UtilityMonthPage;
