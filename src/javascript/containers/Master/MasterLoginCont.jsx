// ---Dependencys
import React, { useState } from 'react';
import { Card, Form, Input, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserSwitchOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLoginCont = withRouter(props => {
  const [disable, setDisable] = useState(false);

  function onLogin() {
    localStorage.setItem('htFBgj3nK6QwY5hm', 'U38Sw5Q8MtNwCYKW');
    props.history.push('/master');
  }

  function onFinish(values) {
    if (
      (values.qJJqEF6kuu4dC7Fw === 'botz' &&
        values.x2BwXvQkubLmm3gK === 'comic456') ||
      (values.qJJqEF6kuu4dC7Fw === 'alina' &&
        values.x2BwXvQkubLmm3gK === 'coco')
    ) {
      setDisable(false);
      onLogin();
    } else {
      setDisable(true);
    }
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }
  return (
    <Card className="login-cont">
      <p>Login</p>
      <br />
      <br />
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        <Form.Item
          name="qJJqEF6kuu4dC7Fw"
          label="Correo"
          rules={[{ required: true, message: 'Por favor ingresa un correo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="x2BwXvQkubLmm3gK"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor tu contraseña' }]}
        >
          <Input.Password />
        </Form.Item>
        <br />
        {disable && <p>Datos de sessión inválidos</p>}
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
});

export default MasterLoginCont;
