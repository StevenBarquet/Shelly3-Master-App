// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, Select, Switch } from 'antd';
import { EditOutlined, ClearOutlined, PlusOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
import mapOptions from 'Utils/mapOptions';
// ---Others
import { catalogos } from 'Others/store-data.json';

const { textColors } = catalogos.home;

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
// --- FORM SECTIONS
function BannerForm(props) {
  const { validation, index } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      <div className="store-cart-form-container">
        <Row gutter={[20, 0]}>
          <Col xs={24} sm={24} lg={24}>
            <h2>{`Banner ${index + 1}`}</h2>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <JoiTextInput
              label="Imagen Escritorio"
              name={`imgDesk${index}`}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <JoiTextInput
              label="Imagen Movil"
              name={`imgMovil${index}`}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <JoiTextArea
              label="Parrafo"
              name={`text${index}`}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <JoiSelectInput
              label="Color del texto"
              name={`imgMovil${index}`}
              options={textColors}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <JoiTextInput
              label="Asociar enlace"
              name={`link${index}`}
              validation={validation}
            />
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <JoiSwitchInput
              label="Visible"
              name={`visible${index}`}
              validation={validation}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}
function BannersSection(props) {
  const { validation, bannerCount, createNewBanner } = props;
  // ---Render
  return (
    <Col xs={24} sm={24} lg={16}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Carrusel</h2>
        </Col>
        <Col className="center-block" xs={24} sm={24} lg={24}>
          <ButtonMlg
            variant="blue"
            onClick={createNewBanner}
            size="small"
            htmlType="button"
            widthB="85%"
            label="Agregar banner"
            icon={<PlusOutlined />}
          />
        </Col>
        {bannerCount &&
          bannerCount.length > 0 &&
          bannerCount.map(bannerIndex => (
            <BannerForm
              key={bannerIndex}
              index={bannerIndex}
              validation={validation}
            />
          ))}
      </Row>
    </Col>
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
    isValidForm,
    onClearForm,
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
          {/* Finish Form */}
        </Row>
      </Form>
    </>
  );
}

export default HomeForm;
