// ---Dependencys
import React from 'react';
// ---Components
import AdminOrders from 'Cont/Master/AdminOrders';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AdminOrdersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AdminOrdersPage" />
      <AdminOrders />
    </React.Fragment>
  );
};

export default AdminOrdersPage;
