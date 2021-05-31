// ---Dependencys
import React from 'react';
// ---Components
import AddProducts from 'Cont/Master/AddProducts';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const AddProductsPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="AddProductsPage" />
      <AddProducts />
    </React.Fragment>
  );
};

export default AddProductsPage;
