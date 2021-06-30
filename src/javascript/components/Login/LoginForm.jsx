// ---Dependencys
import React from 'react';
import { Form, Card, Row, Input } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

// ------------------------------------------ CONTAINER-----------------------------------------
function LoginForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm
  } = props;
  const { mail, pass } = validation;
  // ----------------------- Render
  return (
    <Card className="login-cont">
      <p>Login</p>
      <br />
      <br />
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
        {...formItemLayout}
      >
        <Form.Item
          label="Correo"
          name="mail"
          validateStatus={mail.status}
          help={mail.status === 'error' ? mail.message : null}
          rules={[{ required: false, message: mail.message }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="pass"
          validateStatus={pass.status}
          help={pass.status === 'error' ? pass.message : null}
          rules={[{ required: false, message: pass.message }]}
        >
          <Input.Password />
        </Form.Item>
        <br />
        {!isValidForm && (
          <div className="submit-container">
            <h4>Datos de sessión inválidos</h4>
          </div>
        )}
        <br />
        <Row className="center-block">
          <ButtonMlg
            label="Entrar"
            htmlType="submit"
            variant="purple"
            size="default"
            widthB="180px"
            icon={<UserSwitchOutlined />}
          />
        </Row>
      </Form>
    </Card>
  );
}

export default LoginForm;
