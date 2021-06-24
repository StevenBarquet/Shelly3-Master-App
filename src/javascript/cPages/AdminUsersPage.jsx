// ---Dependencys
import React from 'react';
// ---Components
import AdminOrders from 'Cont/AdminOrders';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AdminUsersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AdminUsersPage" />
      <AdminOrders />
    </React.Fragment>
  );
};

export default AdminUsersPage;
