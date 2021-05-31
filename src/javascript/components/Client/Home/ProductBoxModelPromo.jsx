// ---Dependencys
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
// ---Components
import FitImg from 'CommonComps/FitImg';
// --Others
import { priceFormat } from 'Others/otherMethods';

const mockProd = {
  _id: 'some text',
  marca: 'some text',
  modelo: 'some text',
  type: 'some text',
  precio: 900,
  cover:
    'https://images-na.ssl-images-amazon.com/images/I/71q4BBqaNvL._AC_SX569_.jpg',
  shortMicro: 'some text',
  disponibles: 'some text'
};

// ------------------------------------------ COMPONENT-----------------------------------------
function ProductBoxModelPromo() {
  const [state, setState] = useState({
    promo: 0,
    specialSpan: 10,
    priceSpan: 10
  });
  const {
    _id,
    marca,
    modelo,
    type,
    precio,
    cover,
    shortMicro,
    disponibles
  } = mockProd;
  return (
    <Col align="middle" xs={24} sm={24} lg={8}>
      <Link to={'/item=' + _id}>
        <div className="product-box-container">
          <FitImg
            srcImg={cover}
            estilo="product-box-img-container"
            alt={marca + ' ' + modelo}
          />
          <div className="product-box-title-container">
            <h5>
              Nintendo Switch <span>Lite</span>
            </h5>
          </div>
          <div className="product-box-price-container">
            <Row>
              <Col span={24}>Ahora: $6,450</Col>
            </Row>
          </div>
          <div className="product-box-avilable-container">Disponibles: 6</div>
          <div className="product-box-belt">Consolas y videojuegos</div>
        </div>
      </Link>
    </Col>
  );
}

export default ProductBoxModelPromo;
