// ---Dependencys
import React from 'react';
import { Col, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ------------------------------------------ COMPONENT-----------------------------------------
function AdvanceButtons(props) {
  const { step, toStep, responsableVenta } = props;
  function before() {
    toStep(0);
  }
  function next() {
    if (step === 0) toStep(1);
    else console.log('Finalizando orden...');
  }
  return (
    <Row style={{ margin: '20px 0px 60px 0px' }}>
      <Col xs={24} sm={24} lg={8}>
        <ButtonMlg
          variant={step === 0 ? 'block' : 'yellow'}
          size="small"
          htmlType="button"
          widthB="85%"
          label="Atrás"
          onClick={before}
          icon={<LeftOutlined />}
        />
      </Col>
      <Col xs={24} sm={24} lg={{ span: 8, offset: 8 }}>
        <ButtonMlg
          variant={step === 1 || !responsableVenta ? 'block' : 'yellow'}
          size="small"
          htmlType="button"
          widthB="85%"
          label="Siguiente"
          onClick={next}
          icon={<RightOutlined />}
        />
      </Col>
    </Row>
  );
}

export default AdvanceButtons;
