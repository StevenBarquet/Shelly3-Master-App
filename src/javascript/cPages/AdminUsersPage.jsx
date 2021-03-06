// ---Dependencys
import React from 'react';
// ---Components
import AdminUsers from 'Cont/AdminUsers';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AdminUsersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AdminUsersPage" />
      <AdminUsers />
    </React.Fragment>
  );
};

export default AdminUsersPage;
