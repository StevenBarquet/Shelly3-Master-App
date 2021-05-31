// ---Dependencys
import React from 'react';
// ---Components
import HomeCont from 'Cont/Client/HomeCont';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';

// ------------------------------------------ COMPONENT-----------------------------------------
const HomePage = () => {
  return (
    <React.Fragment>
      <CustomHelmet pageName="Home" />
      <HomeCont />
    </React.Fragment>
  );
};

export default HomePage;
