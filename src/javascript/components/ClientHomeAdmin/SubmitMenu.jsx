// ---Dependencys
import React from 'react';
import { Form, Row, Col } from 'antd';
import { EditOutlined, ClearOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';

function SubmitMenu(props) {
  const { isValidForm, onClearForm, onSubmit, formInstance } = props;
  return (
    <>
      {!isValidForm && (
        <div className="submit-container">
          <h4>Algunos campos no son válidos, revisa tus datos</h4>
        </div>
      )}
      <Form onFinish={onSubmit} form={formInstance}>
        <div className="submit-container">
          <Row style={{ width: '100%' }}>
            <Col className="center-block" xs={24} sm={24} lg={6}>
              <ButtonMlg
                variant="yellow-outline"
                size="small"
                htmlType="button"
                onClick={onClearForm}
                widthB="85%"
                label="Limpiar formulario"
                icon={<ClearOutlined />}
              />
            </Col>
            <Col className="center-block" xs={24} sm={24} lg={18}>
              <ButtonMlg
                variant="yellow"
                size="small"
                htmlType="submit"
                widthB="85%"
                label="Modificar Home"
                icon={<EditOutlined />}
              />
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
}

export default SubmitMenu;
