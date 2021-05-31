// ---Dependencys
import React from 'react';
// ---Components
import AdminPublicHome from 'Cont/Master/AdminPublicHome';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AdminPublicHomePage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AdminPublicHomePage" />
      <AdminPublicHome />
    </React.Fragment>
  );
};

export default AdminPublicHomePage;
