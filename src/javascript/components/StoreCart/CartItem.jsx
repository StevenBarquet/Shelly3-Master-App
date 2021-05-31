// ---Dependencys
import React from 'react';
import { Row, Col, Form, InputNumber } from 'antd';
// ---ComonComponents
import FitImg from 'CommonComps/FitImg';
import CloseButton from 'CommonComps/CloseButton';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// ---AUX COMPONENTS
function PiezasForm(props) {
  // ----------------------- hooks, const, props y states
  const { max, id, callback, defaultValue } = props;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  };
  // ----------------------- Metodos Principales
  function onFormChange(objValue) {
    const value = Object.values(objValue)[0];
    callback(id, value);
  }
  return (
    <Form
      initialValues={{ piezas: defaultValue }}
      onValuesChange={onFormChange}
    >
      <Form.Item
        {...formItemLayout}
        name="piezas"
        label="Piezas"
        validateStatus="erro"
        help={`Máximas: ${max}`}
      >
        <InputNumber min={1} max={max} />
      </Form.Item>
    </Form>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function CartItem(props) {
  const {
    images,
    piezas,
    _id,
    updatePiezas,
    precio,
    nombre,
    disponibles,
    onDeleteButton
  } = props;
  // ----------------------- Render
  return (
    <Col xs={24} sm={24} lg={{ offset: 1, span: 20 }}>
      <div className="cart-item-container">
        <Row className="cart-item-header">
          <Col className="elipse" xs={22} sm={22} lg={22}>
            {nombre}
          </Col>
          <Col xs={2} sm={2} lg={2}>
            <CloseButton onDeleteButton={onDeleteButton} value={_id} />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} lg={8}>
            <FitImg
              srcImg={images ? images.mini || images.cover : 'none'}
              estilo="cart-images-big"
              alt={nombre}
            />
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <div className="col-vertical-align">
              <PiezasForm
                callback={updatePiezas}
                defaultValue={piezas}
                id={_id}
                max={disponibles}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <section>
              <h5>
                Por pieza: <span>{priceFormat(precio)}</span>
              </h5>
            </section>
            <section>
              <h4>
                Precio: <span>{priceFormat(precio * piezas)}</span>
              </h4>
            </section>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CartItem;
