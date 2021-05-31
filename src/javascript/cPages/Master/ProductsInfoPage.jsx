// ---Dependencys
import React from 'react';
// ---Components
import ProductsInfo from 'Cont/Master/ProductsInfo';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const ProductsInfoPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="ProductsInfoPage" />
      <ProductsInfo />
    </React.Fragment>
  );
};

export default ProductsInfoPage;
