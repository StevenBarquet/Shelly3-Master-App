// ---Dependencys
import React from 'react';
// ---Components
import CreateUsers from 'Cont/CreateUsers';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const CreateUsersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="CreateUsersPage" />
      <CreateUsers />
    </React.Fragment>
  );
};

export default CreateUsersPage;
