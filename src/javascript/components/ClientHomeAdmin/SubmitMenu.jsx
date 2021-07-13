// ---Dependencys
import React from 'react';
import { Form, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';

function SubmitMenu(props) {
  const { isValidForm, onSubmit, formInstance, onChangeForm } = props;
  return (
    <>
      {!isValidForm && (
        <div className="submit-container">
          <h4>Algunos campos no son válidos, revisa tus datos</h4>
        </div>
      )}
      <Form
        onFinish={onSubmit}
        onValuesChange={onChangeForm}
        form={formInstance}
      >
        <div className="submit-container">
          <Row style={{ width: '100%' }}>
            <Col className="center-block" xs={24} sm={24} lg={24}>
              <ButtonMlg
                variant="yellow"
                size="small"
                htmlType="submit"
                widthB="60%"
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
