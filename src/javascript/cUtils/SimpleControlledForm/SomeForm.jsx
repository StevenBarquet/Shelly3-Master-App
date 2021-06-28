// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, Select, Switch } from 'antd';
import { PlusOutlined, ClearOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
import mapOptions from 'Utils/mapOptions';

// --- AUX COMPONENTS
function JoiTextInput(props) {
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
      <Input />
    </Form.Item>
  );
}
function JoiSelectInput(props) {
  const { label, name, validation, options } = props;
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
      <Select>{mapOptions(options)}</Select>
    </Form.Item>
  );
}
function JoiSwitchInput(props) {
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
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
  );
}
// --- FORM SECTIONS
function SubmitMenu(props) {
  const { isValidForm, onClearForm } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      {!isValidForm && (
        <div className="submit-container">
          <h4>Algunos campos no son válidos, revisa tus datos</h4>
        </div>
      )}
      <div className="submit-container">
        <Row style={{ width: '100%' }}>
          <Col xs={24} sm={24} lg={6}>
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
          <Col xs={24} sm={24} lg={18}>
            <ButtonMlg
              variant="purple"
              size="small"
              htmlType="submit"
              widthB="85%"
              label="Submit"
              icon={<PlusOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function SomeForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    onClearForm
  } = props;
  const genderOptions = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    },
    {
      label: 'Unknown',
      value: 'unknown'
    }
  ];

  return (
    <>
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
      >
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={24} lg={12}>
            <JoiTextInput label="Nombre" name="name" validation={validation} />
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <JoiSelectInput
              label="Género"
              name="gender"
              options={genderOptions}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <JoiSwitchInput
              label="Online"
              name="online"
              validation={validation}
            />
          </Col>
          {/* Finish Form */}
          <SubmitMenu onClearForm={onClearForm} isValidForm={isValidForm} />
        </Row>
      </Form>
    </>
  );
}

export default SomeForm;
