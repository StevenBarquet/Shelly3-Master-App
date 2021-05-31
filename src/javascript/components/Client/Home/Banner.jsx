// ---Dependencys
import React from 'react';

// ------------------------------------------ COMPONENT-----------------------------------------
const Banner = props => {
  const { srcImg } = props;
  return (
    <div>
      <img src={srcImg} width="100%" alt="shelly" />
    </div>
  );
};

export default Banner;
