// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input } from 'antd';
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
function JoiTextArea(props) {
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
      <Input.TextArea />
    </Form.Item>
  );
}

function ProductInput(props) {
  const { index, validation } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>{`Producto: ${index + 1}`}</h2>
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextInput
            label="ID del producto"
            name={`porductID${index}`}
            validation={validation}
          />
        </Col>
      </Row>
    </Col>
  );
}
// --- FORM SECTIONS
function ProductsSection(props) {
  const { validation } = props;
  const dumArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      {dumArray.map(index => (
        <ProductInput key={index} index={index} validation={validation} />
      ))}
    </>
  );
}
function InfoTextInputs(props) {
  const { validation } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Información en home page:</h2>
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextInput
            label="ID"
            name="_id"
            disabled
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextArea
            label="Parrafo"
            name="paragraph"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextInput
            label="Imagen"
            name="paragraphImg"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiTextInput label="Noticia" name="notice" validation={validation} />
        </Col>
      </Row>
    </Col>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function HomeForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    formInstance
  } = props;
  return (
    <>
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
        form={formInstance}
      >
        <Row gutter={[20, 10]}>
          <InfoTextInputs validation={validation} />
          <ProductsSection validation={validation} />
          {/* Finish Form */}
        </Row>
      </Form>
    </>
  );
}

export default HomeForm;
