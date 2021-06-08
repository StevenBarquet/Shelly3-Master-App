// ---Dependencys
import React from 'react';
import { Helmet } from 'react-helmet';
// ---Others
import { ownerData } from 'Others/store-data.json';
// ------------------------------------------ COMPONENT-----------------------------------------
const CustomHelmet = props => {
  const { pageName } = props;
  const { title, pagesData } = ownerData;
  const name = pagesData[pageName].title;
  return (
    <Helmet>
      <title>{`${title.shortStoreName} | ${name}`}</title>
    </Helmet>
  );
};

export default CustomHelmet;
