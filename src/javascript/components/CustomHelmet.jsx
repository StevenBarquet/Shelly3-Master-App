// ---Dependencys
import React from 'react';
import { Helmet } from 'react-helmet';
// ---Others
import { title, pagesData } from 'Others/labels.json';
// ------------------------------------------ COMPONENT-----------------------------------------
const CustomHelmet = props => {
  const { pageName } = props;
  const name = pagesData[pageName].title;
  return (
    <Helmet>
      <title>{`${title.shortStoreName} | ${name}`}</title>
    </Helmet>
  );
};

export default CustomHelmet;
