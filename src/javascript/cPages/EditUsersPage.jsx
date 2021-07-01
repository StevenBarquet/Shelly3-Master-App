// ---Dependencys
import React from 'react';
// ---Components
import EditUsers from 'Cont/EditUsers';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const EditUsersPage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="EditUsersPage" />
      <EditUsers />
    </React.Fragment>
  );
};

export default EditUsersPage;
