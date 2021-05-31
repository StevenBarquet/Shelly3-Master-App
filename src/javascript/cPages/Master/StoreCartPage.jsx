// ---Dependencys
import React from 'react';
// ---Components
import StoreCart from 'Cont/Master/StoreCart';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const StoreCartPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="StoreCartPage" />
      <StoreCart />
    </React.Fragment>
  );
};

export default StoreCartPage;
