// ---Dependencys
import React from 'react';
// ---Components
import EditOrders from 'Cont/EditOrders';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const EditOrdersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="EditOrdersPage" />
      <EditOrders />
    </React.Fragment>
  );
};

export default EditOrdersPage;
