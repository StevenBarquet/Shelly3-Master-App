// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, InputNumber } from 'antd';
import { EditOutlined, ClearOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';

// --- AUX COMPONENTS
function JoiTextInput(props) {
  const { label, name, validation, disabled } = props;
  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={validation[name].status}
      help={
        validation[name].status === 'error' ? validation[name].message : null
      }
      rules={[{ required: false, message: validation[name].message }]}
    >
      <Input disabled={disabled} />
    </Form.Item>
  );
}
function JoiPassInput(props) {
  const { label, name, validation, disabled } = props;
  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={validation[name].status}
      help={
        validation[name].status === 'error' ? validation[name].message : null
      }
      rules={[{ required: false, message: validation[name].message }]}
    >
      <Input.Password disabled={disabled} />
    </Form.Item>
  );
}
function JoiInputNumber(props) {
  const { label, name, validation } = props;
  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={validation[name].status}
      help={
        validation[name].status === 'error' ? validation[name].message : null
      }
      rules={[{ required: false, message: validation[name].message }]}
    >
      <InputNumber style={{ width: 150 }} />
    </Form.Item>
  );
}

// --- FORM SECTIONS
function BasicInputs(props) {
  const { validation } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Información básica:</h2>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput
            disabled
            label="Correo"
            name="mail"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput
            label="Nombre"
            name="fullName"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={10}>
          <JoiPassInput
            label="Nueva contraseña"
            name="pass"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={10}>
          <JoiPassInput
            label="Confirma nueva contraseña"
            name="confirmPass"
            validation={validation}
          />
        </Col>
      </Row>
    </Col>
  );
}
function ProfileInputs(props) {
  const { validation } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Completar Perfil:</h2>
        </Col>
        <Col xs={24} sm={24} lg={10}>
          <JoiTextInput label="RFC" name="rfc" validation={validation} />
        </Col>
        <Col xs={24} sm={24} lg={7}>
          <JoiInputNumber
            label="Telefono 1"
            name="phone"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={7}>
          <JoiInputNumber
            label="Telefono 2"
            name="otherPhone"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextInput
            label="Direccion"
            name="adress"
            validation={validation}
          />
        </Col>
      </Row>
    </Col>
  );
}
function SubmitMenu(props) {
  const { isValidForm, onClearForm, withData } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      {!isValidForm && (
        <div className="submit-container">
          <h4>Algunos campos no son válidos, revisa tus datos</h4>
        </div>
      )}
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
              variant={withData ? 'yellow' : 'block'}
              size="small"
              htmlType="submit"
              widthB="85%"
              label="Editar mi cuenta"
              icon={<EditOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function EditUsersForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    withData,
    onClearForm
  } = props;

  return (
    <>
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
      >
        <Row gutter={[20, 10]}>
          <BasicInputs withData={withData} validation={validation} />
          <ProfileInputs validation={validation} />
          {/* Finish Form */}
          <SubmitMenu
            onClearForm={onClearForm}
            isValidForm={isValidForm}
            withData={withData}
          />
        </Row>
      </Form>
    </>
  );
}

export default EditUsersForm;
