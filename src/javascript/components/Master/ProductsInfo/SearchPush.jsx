/* eslint-disable prefer-promise-reject-errors */
// ---Dependencys
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
// ---CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Other
import { isId } from 'Others/otherMethods';

// ---AUX COMPONENTS
function SubmitButton() {
  return (
    <Col className="col-vertical-align" xl={7}>
      <ButtonMlg
        variant="yellow"
        size="small"
        htmlType="submit"
        widthB="85%"
        label="Buscar"
        icon={<LoginOutlined />}
      />
    </Col>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function SearchPush(props) {
  // ----------------------- hooks, const, props y states
  const { pushPath } = props;
  const history = useHistory();

  // ----------------------- Metodos Principales
  const onFinish = data => history.push(`${pushPath}?${data.id}`);

  // ----------------------- Metodos Auxiliares
  function validate(rule, value) {
    // valida:
    // -Cadena exista y tenga entre 24 de longitud
    // -Sólo contiene caracteres alfanumericos
    if (value && isId(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Ingresa una ID válido');
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
              label="ID del producto"
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
export default SearchPush;
