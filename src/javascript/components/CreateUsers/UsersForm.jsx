// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, InputNumber, Switch } from 'antd';
import { EditOutlined, PlusOutlined, ClearOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
// ---Others
import { appData } from 'Others/store-data.json';

const { menuRoutes } = appData;

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
function JoiPassInput(props) {
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
      <Input.Password />
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
function BasicInputs(props) {
  const { validation } = props;
  return (
    <Col xs={24} sm={24} lg={12}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Información básica:</h2>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput label="Correo" name="mail" validation={validation} />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput
            label="Nombre"
            name="fullName"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiPassInput
            label="Contraseña"
            name="pass"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <JoiPassInput
            label="Confirma contraseña"
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
    <Col xs={24} sm={24} lg={12}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Completar Perfil:</h2>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput label="RFC" name="rfc" validation={validation} />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiTextInput
            label="Documentos"
            name="docsUrl"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <JoiInputNumber
            label="Telefono 1"
            name="phone"
            validation={validation}
          />
        </Col>
        <Col xs={24} sm={24} lg={12}>
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
function UtilityRoutes(props) {
  const { validation } = props;
  return (
    <Col xs={12} sm={12} lg={6}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h3>
            <span>Utilidades:</span>
          </h3>
        </Col>
        {menuRoutes.map(routeData => {
          if (routeData.parentKey === 'utilityMenu')
            return (
              <Col key={routeData.routeName} xs={24} sm={24} lg={24}>
                <JoiSwitchInput
                  label={routeData.routeLabel}
                  name={routeData.routeName}
                  validation={validation}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Col>
  );
}
function ProductRoutes(props) {
  const { validation } = props;
  return (
    <Col xs={12} sm={12} lg={6}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h3>
            <span>Productos:</span>
          </h3>
        </Col>
        {menuRoutes.map(routeData => {
          if (routeData.parentKey === '/master/tienda')
            return (
              <Col key={routeData.routeName} xs={24} sm={24} lg={24}>
                <JoiSwitchInput
                  label={routeData.routeLabel}
                  name={routeData.routeName}
                  validation={validation}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Col>
  );
}
function OrdersRoutes(props) {
  const { validation } = props;
  return (
    <Col xs={12} sm={12} lg={6}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h3>
            <span>Ordenes:</span>
          </h3>
        </Col>
        {menuRoutes.map(routeData => {
          if (routeData.parentKey === 'orderMenu')
            return (
              <Col key={routeData.routeName} xs={24} sm={24} lg={24}>
                <JoiSwitchInput
                  label={routeData.routeLabel}
                  name={routeData.routeName}
                  validation={validation}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Col>
  );
}
function UserRoutes(props) {
  const { validation } = props;
  return (
    <Col xs={12} sm={12} lg={6}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h3>
            <span>Administración de cuentas:</span>
          </h3>
        </Col>
        {menuRoutes.map(routeData => {
          if (routeData.parentKey === 'usersMenu')
            return (
              <Col key={routeData.routeName} xs={24} sm={24} lg={24}>
                <JoiSwitchInput
                  label={routeData.routeLabel}
                  name={routeData.routeName}
                  validation={validation}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Col>
  );
}
function GralPublicRoutes(props) {
  const { validation } = props;
  return (
    <Col xs={12} sm={12} lg={6}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h3>
            <span>Publico General:</span>
          </h3>
        </Col>
        {menuRoutes.map(routeData => {
          if (routeData.parentKey === 'generalPublicMenu')
            return (
              <Col key={routeData.routeName} xs={24} sm={24} lg={24}>
                <JoiSwitchInput
                  label={routeData.routeLabel}
                  name={routeData.routeName}
                  validation={validation}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Col>
  );
}
function SubmitMenu(props) {
  const { isValidForm, onClearForm, isEdit } = props;
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
              label={isEdit ? 'Editar cuenta' : 'Agregar cuenta'}
              icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function UsersForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    isEdit,
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
          <BasicInputs validation={validation} />
          <ProfileInputs validation={validation} />
          <Col xs={24} sm={24} lg={24}>
            <h2>Características autorizadas</h2>
          </Col>
          <UtilityRoutes validation={validation} />
          <ProductRoutes validation={validation} />
          <OrdersRoutes validation={validation} />
          <UserRoutes validation={validation} />
          <GralPublicRoutes validation={validation} />
          {/* Finish Form */}
          <SubmitMenu
            onClearForm={onClearForm}
            isValidForm={isValidForm}
            isEdit={isEdit}
          />
        </Row>
      </Form>
    </>
  );
}

export default UsersForm;
