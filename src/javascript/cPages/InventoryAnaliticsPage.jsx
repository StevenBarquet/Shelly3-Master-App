// ---Dependencys
import React from 'react';
// ---Components
import InventoryAnalitics from 'Cont/InventoryAnalitics';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const InventoryAnaliticsPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="InventoryAnaliticsPage" />
      <InventoryAnalitics />
    </React.Fragment>
  );
};

export default InventoryAnaliticsPage;
