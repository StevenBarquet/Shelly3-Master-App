// ---Dependencys
import React from 'react';
// ---Containers
import UtilityWeek from 'Cont/UtilityWeek';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const UtilityWeekPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="UtilityWeekPage" />
      <UtilityWeek />
    </React.Fragment>
  );
};

export default UtilityWeekPage;
