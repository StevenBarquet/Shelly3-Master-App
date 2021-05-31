// ---Dependencys
import React from 'react';
// ---Components
import AdminProducts from 'Cont/AdminProducts';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AdminProductsPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AdminProductsPage" />
      <AdminProducts />
    </React.Fragment>
  );
};

export default AdminProductsPage;
