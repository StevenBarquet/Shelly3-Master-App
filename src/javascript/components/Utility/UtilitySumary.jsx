// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Util Comps
// import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/AuthValidate';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// ------------------------------------------ COMPONENT-----------------------------------------
function UtilitySumary(props) {
  const { orders } = props;
  // ----------------------- Metodos Principales
  function getAllUtility(items) {
    const someItems = items && items.length > 0 ? items : null;
    if (someItems) {
      let suma = 0;
      someItems.forEach(element => {
        suma += element.utility;
      });
      return suma;
    }
    return 0;
  }
  function getAllSells(items) {
    const someItems = items && items.length > 0 ? items : null;
    if (someItems) {
      let suma = 0;
      someItems.forEach(element => {
        suma += element.totalVenta;
      });
      return suma;
    }
    return 0;
  }
  // ----------------------- Metodos Auxiliares
  return (
    <div className="store-content-container">
      <Row>
        <Col xs={24} sm={24} lg={24}>
          <h4>
            Ventas totales:{' '}
            <span>{(orders && orders.length && orders.length) || 0}</span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} lg={24}>
          <h4>
            Utilidad total: <span>{priceFormat(getAllUtility(orders))}</span>
          </h4>
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <h4>
            Venta total: <span>{priceFormat(getAllSells(orders))}</span>
          </h4>
        </Col>
      </Row>
    </div>
  );
}

export default UtilitySumary;
