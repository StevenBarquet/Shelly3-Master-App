// ---Dependencys
import React from 'react';
// ---Components
import ClientHomeAdmin from 'Cont/ClientHomeAdmin';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const ClientHomeAdminPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="ClientHomeAdminPage" />
      <ClientHomeAdmin />
    </React.Fragment>
  );
};

export default ClientHomeAdminPage;
