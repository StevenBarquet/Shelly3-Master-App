// ---Dependencys
import React, { useState } from 'react';
import { Row, Col, Switch } from 'antd';
// ---Util Comps
// import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
import MathGraph from 'Comp/InventoryAnalitics/MathGraphContainer/MathGraph';

function ScaleSwitchButton(props) {
  const { onChangeScale, zeroScale } = props;
  return (
    <>
      <h4>
        Escala desde 0:
        <Switch
          style={{ marginLeft: 15 }}
          defaultChecked={zeroScale}
          onChange={onChangeScale}
        />
      </h4>
    </>
  );
}

// ------------------------------------------ COMPONENT-----------------------------------------
function MathGraphContainer(props) {
  const {
    inventoryData,
    totalCosto,
    totalPrecioLocal,
    totalPrecioOnline
  } = props;

  const [zeroScale, setZeroScale] = useState(true);
  // ----------------------- Metodos Principales
  function onChangeScale(checked) {
    setZeroScale(checked);
  }
  // ----------------------- Metodos Auxiliares
  if (inventoryData && inventoryData.length)
    return (
      <Row gutter={[5, 5]}>
        <Col xs={24} sm={24} lg={24}>
          <ScaleSwitchButton
            onChangeScale={onChangeScale}
            zeroScale={zeroScale}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <MathGraph
            inventoryData={inventoryData}
            totalCosto={totalCosto}
            totalPrecioLocal={totalPrecioLocal}
            totalPrecioOnline={totalPrecioOnline}
            zeroScale={zeroScale}
          />
        </Col>
      </Row>
    );
  return null;
}

export default MathGraphContainer;
