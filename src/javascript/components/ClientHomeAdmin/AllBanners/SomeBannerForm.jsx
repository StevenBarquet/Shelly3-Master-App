/* eslint-disable jsx-a11y/anchor-is-valid */
// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, Select, Switch, Popconfirm } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
// ---Util Comps
import mapOptions from 'Utils/mapOptions';
import ButtonMlg from 'Utils/ButtonMlg';
import CloseButton from 'Utils/CloseButton';

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
function SubmitMenu(props) {
  const { isValidForm, bannerFormEditMode } = props;
  return (
    <Col xs={24} sm={24} lg={24}>
      {!isValidForm && (
        <div className="submit-container">
          <h4>Algunos campos no son válidos, revisa tus datos</h4>
        </div>
      )}
      <div className="submit-container">
        <Row style={{ width: '100%' }}>
          <Col className="center-block" xs={24} sm={24} lg={8}>
            <ButtonMlg
              variant="yellow"
              size="small"
              htmlType="submit"
              widthB="85%"
              label="Guardar cambios"
              icon={<SaveOutlined />}
            />
          </Col>
          <Col className="center-block" xs={24} sm={24} lg={8}>
            <ButtonMlg
              variant="red"
              size="small"
              htmlType="button"
              onClick={() => bannerFormEditMode(false)}
              widthB="85%"
              label="Cancelar"
              icon={<StopOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}
function TitleSection(props) {
  const { bannerID, onDeleteBanner } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={22}>
        <h2>{`Banner ${bannerID}`}</h2>
      </Col>
      <Col xs={2} sm={2} lg={2}>
        <Popconfirm
          title={`¿Deseas eliminar el banner: ${bannerID}？`}
          okText="Si"
          onConfirm={() => onDeleteBanner(bannerID)}
          cancelText="No"
        >
          <a href="#">
            <CloseButton estilo="form-close-button" />
          </a>
        </Popconfirm>
      </Col>
    </>
  );
}
function FormSection(props) {
  const { validation } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={12}>
        <JoiTextInput
          label="Imagen Escritorio"
          name="imgDesk"
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={12}>
        <JoiTextInput
          label="Imagen Movil"
          name="imgMovil"
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={16}>
        <JoiTextArea label="Parrafo" name="text" validation={validation} />
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <JoiSelectInput
          label="Color del texto"
          name="textColor"
          options={textColors}
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={16}>
        <JoiTextInput
          label="Asociar enlace"
          name="link"
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <JoiSwitchInput
          label="Visible"
          name="visible"
          validation={validation}
        />
      </Col>
    </>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function SomeBannerForm(props) {
  // ----------------------- hooks, const, props y states
  const { bannerID, bannerFormMethods, allBannersData, bannerData } = props;
  const {
    onChangeForm,
    onSaveBanner,
    onDeleteBanner,
    bannerFormEditMode
  } = bannerFormMethods;
  const { msgSchema: validation, isValidForm } = allBannersData;
  // ----------------------- Metodos Principales
  function onFinish(formData) {
    const newBannerData = {
      ...bannerData,
      banner: formData
    };
    onSaveBanner(newBannerData);
  }
  // ----------------------- Render
  return (
    <Col xs={24} sm={24} lg={24}>
      <div className="store-cart-form-container">
        <Form
          onFinish={onFinish}
          initialValues={bannerData.banner}
          onValuesChange={onChangeForm}
        >
          <Row gutter={[20, 0]}>
            <TitleSection bannerID={bannerID} onDeleteBanner={onDeleteBanner} />
            <FormSection validation={validation} />
            {/* Finish Form */}
            <SubmitMenu
              isValidForm={isValidForm}
              bannerFormEditMode={bannerFormEditMode}
            />
          </Row>
        </Form>
      </div>
    </Col>
  );
}

export default SomeBannerForm;
