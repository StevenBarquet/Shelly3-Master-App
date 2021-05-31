// ---Dependencys
import React, { useState } from 'react';
import { Form, Row, Col, Input, InputNumber, Radio } from 'antd';
import {
  SendOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// --- AUX COMPONENTS
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
function PayMethods(props) {
  const { label, name, validation } = props;
  return (
    <Form.Item
      className="pay-methods"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      label={label}
      name={name}
      validateStatus={validation[name].status}
      help={
        validation[name].status === 'error' ? validation[name].message : null
      }
      rules={[{ required: false, message: validation[name].message }]}
    >
      <Radio.Group>
        <Row style={{ marginTop: 25, width: '100%' }}>
          <Col xs={12} sm={12} lg={8}>
            <Radio value="Efectivo">
              <h5>Efectivo</h5>
            </Radio>
          </Col>
          <Col xs={12} sm={12} lg={8}>
            <Radio value="Tarjeta">
              <h5>Tarjeta</h5>
            </Radio>
          </Col>
          <Col xs={12} sm={12} lg={8}>
            <Radio value="Transferencia">
              <h5>Transferencia</h5>
            </Radio>
          </Col>
        </Row>
      </Radio.Group>
    </Form.Item>
  );
}
function ClientDataButtons(props) {
  const { clientData, setClientData } = props;
  return (
    <>
      <Col className="col-vertical-align" xs={24} sm={24} lg={12}>
        <ButtonMlg
          variant="yellow"
          size="small"
          htmlType="button"
          widthB="85%"
          label="Datos de cliente"
          onClick={() => setClientData(!clientData)}
          icon={
            clientData ? (
              <VerticalAlignTopOutlined />
            ) : (
              <VerticalAlignBottomOutlined />
            )
          }
        />
      </Col>
      <Col className="col-vertical-align" xs={24} sm={24} lg={12}>
        <ButtonMlg
          variant="block"
          size="small"
          htmlType="button"
          widthB="85%"
          label="Datos de facturación"
          icon={<VerticalAlignBottomOutlined />}
        />
      </Col>
    </>
  );
}
function MathData(props) {
  const { responsableVenta, subTotal, totalVenta } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={7}>
        <h5>
          Responsable: <span>{responsableVenta}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={7}>
        <h5>
          Sub-Total: <span>{priceFormat(subTotal || 0)}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={10}>
        <h1>
          Total: <span>{priceFormat(totalVenta || 0)}</span>
        </h1>
      </Col>
    </>
  );
}
function CashHelper(props) {
  const { validation, defaultValues, totalVenta } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={12}>
        <JoiInputNumber
          label="Monto pagado"
          name="montoCliente"
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={12}>
        <h1>
          Cambio:
          <span>
            {priceFormat(defaultValues.montoCliente - totalVenta || 0)}
          </span>
        </h1>
      </Col>
    </>
  );
}
function ClientForm(props) {
  const { validation } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={24}>
        <JoiTextInput label="Nombre" name="nombre" validation={validation} />
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <JoiTextInput
          label="Apellido"
          name="apellido"
          validation={validation}
        />
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <JoiTextInput label="Correo" name="correo" validation={validation} />
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <JoiInputNumber
          label="Teléfono"
          name="telefono"
          validation={validation}
        />
      </Col>
    </>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function OrderDataForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    subTotal,
    responsableVenta,
    totalVenta
  } = props;
  const [clientData, setClientData] = useState(false);
  return (
    <div className="store-cart-form-container">
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
      >
        <Row gutter={[15, 0]}>
          <Col xs={24} sm={24} lg={15}>
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={24} lg={24}>
                <h2>Datos de la compra</h2>
              </Col>
              <Col xs={24} sm={24} lg={24}>
                <JoiTextArea
                  label="Detalle"
                  name="notaVenta"
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h3>
                  Cobro adicional:
                  <span>{priceFormat(defaultValues.cantidad || 0)}</span>
                </h3>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <JoiInputNumber
                  label="Cantidad"
                  name="cantidad"
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={24}>
                <JoiTextArea
                  label="Concepto"
                  name="concepto"
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={24}>
                <PayMethods
                  label="Método de pago"
                  name="metodoPago"
                  validation={validation}
                />
              </Col>
              {defaultValues.metodoPago === 'Efectivo' && (
                <CashHelper
                  defaultValues={defaultValues}
                  validation={validation}
                  totalVenta={totalVenta}
                />
              )}
              <MathData
                subTotal={subTotal}
                responsableVenta={responsableVenta}
                totalVenta={totalVenta}
              />
            </Row>
          </Col>
          <Col xs={24} sm={24} lg={9}>
            <Row gutter={[20, 10]}>
              <ClientDataButtons
                clientData={clientData}
                setClientData={setClientData}
              />
              {clientData && <ClientForm validation={validation} />}
            </Row>
          </Col>

          {/* Finish Form */}
          <Col xs={24} sm={24} lg={24}>
            {!isValidForm && (
              <div className="submit-container">
                <h4>Algunos campos no son válidos, revisa tus datos</h4>
              </div>
            )}
            <div className="submit-container">
              <ButtonMlg
                variant="yellow-outline"
                size="small"
                htmlType="submit"
                widthB="85%"
                label="Finalizar"
                icon={<SendOutlined />}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default OrderDataForm;
