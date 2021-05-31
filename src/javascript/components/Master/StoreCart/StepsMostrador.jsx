import React from 'react';
import { Row, Col, Steps, Affix } from 'antd';
// ---Redux
import { useSelector } from 'react-redux';
// ---Components
import CartMaths from 'Comp/Master/StoreCart/CartMaths';

const { Step } = Steps;

function StepsMostrador(props) {
  const { step, subTotal, size } = props;
  // Redux States
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);

  // ----------------------- Render
  if (isMovil || step === 1) {
    return (
      <Row>
        <Col xs={24} sm={24} lg={{ offset: 4, span: 10 }}>
          <Steps current={step}>
            <Step title="Productos" description="Agrega tus productos" />
            <Step
              title="Completar"
              description="Completa datos de la orden y finaliza la compra"
            />
          </Steps>
        </Col>
        <Col xs={24} sm={24} lg={{ offset: 4, span: 4 }}>
          <CartMaths subTotal={subTotal} size={size} />
        </Col>
      </Row>
    );
  }
  return (
    <Affix offsetTop={0}>
      <Row className="sroreCart-steps-container">
        <Col xs={24} sm={24} lg={{ offset: 4, span: 10 }}>
          <Steps current={step}>
            <Step title="Productos" description="Agrega tus productos" />
            <Step
              title="Completar"
              description="Completa datos de la orden y finaliza la compra"
            />
          </Steps>
        </Col>
        <Col xs={24} sm={24} lg={{ offset: 4, span: 4 }}>
          <CartMaths subTotal={subTotal} size={size} />
        </Col>
      </Row>
    </Affix>
  );
}

export default StepsMostrador;
