// ---Dependencys
import React from 'react';
import { Row } from 'antd';
// ---Components
import ProductBoxModel from 'Comp/Client/Home/ProductBoxModel';
import ProductBoxModelPromo from 'Comp/Client/Home/ProductBoxModelPromo';

// ------------------------------------------ COMPONENT-----------------------------------------
function Destacados() {
  return (
    <div className="destacados-cont">
      <h1>Destacados</h1>
      <Row>
        <ProductBoxModel />
        <ProductBoxModelPromo />
        <ProductBoxModel />
        <ProductBoxModel />
        <ProductBoxModelPromo />
        <ProductBoxModel />
        <ProductBoxModel />
        <ProductBoxModelPromo />
        <ProductBoxModel />
      </Row>
    </div>
  );
}

export default Destacados;
