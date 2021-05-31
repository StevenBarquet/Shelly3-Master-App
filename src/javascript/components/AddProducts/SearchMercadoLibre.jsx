/* eslint-disable prefer-promise-reject-errors */
// ---Dependencys
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
// ---CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Other
import { validateML } from './SearchMercadoLibreJoi';

// ---AUX COMPONENTS
function SubmitButton() {
  return (
    <Col className="col-vertical-align" xl={7}>
      <ButtonMlg
        variant="yellow-outline"
        size="small"
        htmlType="submit"
        widthB="85%"
        label="Traer Datos de ML"
        icon={<CopyOutlined />}
      />
    </Col>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function SearchMercadoLibre(props) {
  // ----------------------- hooks, const, props y states
  const { onFinish } = props;

  // ----------------------- Metodos Principales

  // ----------------------- Metodos Auxiliares
  function validate(rule, value) {
    const { error } = validateML(value);
    if (!error) {
      return Promise.resolve();
    }
    console.log(error.details);
    return Promise.reject('Ingresa una ID o URL de Mercado libre válida');
  }

  // ----------------------- Render
  return (
    <div className="store-content-container">
      {/* ----------------------------form------------------------- */}
      <Form style={{ width: '100%' }} onFinish={onFinish}>
        <Row>
          <Col style={{ marginTop: '20px' }} xl={17}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name="id"
              label="ID o URL"
              rules={[
                {
                  required: false,
                  message: 'ingresa un ID'
                },
                { validator: validate }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <SubmitButton />
        </Row>
      </Form>
    </div>
  );
}
export default SearchMercadoLibre;
