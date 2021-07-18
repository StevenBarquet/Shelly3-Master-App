// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// ------------------------------------------ COMPONENT-----------------------------------------
function MathSumary(props) {
  const {
    totalCosto,
    totalPrecioLocal,
    totalPrecioOnline,
    inventoryData,
    totalPurchases
  } = props;
  // ----------------------- Metodos Principales
  // ----------------------- Metodos Auxiliares
  if (inventoryData && inventoryData.length)
    return (
      <div className="store-content-container">
        <Row>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Productos en inventario: <span>{inventoryData.length}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Productos vendidos hasta hoy: <span>{totalPurchases}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Dinero invertido en inventario:{' '}
              <span>{priceFormat(totalCosto)}</span>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Dinero de venta potencial (local):{' '}
              <span>{priceFormat(totalPrecioLocal)}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Dinero de venta potencial(online) :{' '}
              <span>{priceFormat(totalPrecioOnline)}</span>
            </h4>
          </Col>
        </Row>
      </div>
    );
  return null;
}

export default MathSumary;
