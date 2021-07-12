// ---Dependencys
import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Radio,
  DatePicker
} from 'antd';
import { SendOutlined, EditOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
import mapOptions from 'Utils/mapOptions';
import FitImg from 'Utils/FitImg';
// ---Others
import { priceFormat } from 'Others/otherMethods';
import { dateMongoToClient, dateMongoToMoment } from 'Others/dateMethods';
import { catalogos, appData } from 'Others/store-data.json';

// --- AUX COMPONENTS
function JustData(props) {
  const { label, name } = props;
  return (
    <h3>
      {`${label}: `}
      <span>{name}</span>
    </h3>
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
  const { label, name, options, validation } = props;
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
function JoiDatePicker(props) {
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
      <DatePicker format="YYYY/MMM/DD" />
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
function Item(props) {
  const { item } = props;
  const { images, nombre, costo, precio, piezas, _id } = item;
  return (
    <div className="order-item">
      <h1 className="elipse">{nombre}</h1>
      <Row>
        <Col xs={24} sm={24} lg={6}>
          <section>
            <FitImg
              srcImg={images ? images.mini || images.cover : 'none'}
              // estilo="cart-images-big"
              alt={nombre}
            />
          </section>
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <Row>
            <Col xs={24} sm={24} lg={12}>
              <h4>
                Costo: <span>{priceFormat(costo)}</span>
              </h4>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <h4>
                Precio: <span>{priceFormat(precio)}</span>
              </h4>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <Row>
            <Col xs={24} sm={24} lg={12}>
              <h4>
                piezas: <span>{piezas}</span>
              </h4>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <h4>
                id: <span>{_id}</span>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
function ItemList(props) {
  const { items } = props;
  return (
    <>
      {items.map(item => (
        <Item key={item._id} item={item} />
      ))}
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
function DateSection(props) {
  const { date, onAllowDateEdit, editDate, validation } = props;
  if (!editDate)
    return (
      <Row>
        <Col xs={24} sm={24} lg={20}>
          <JustData label="Fecha" name={dateMongoToClient(date)} />
        </Col>
        <Col xs={24} sm={24} lg={4}>
          <ButtonMlg
            variant="blue"
            size="small"
            onClick={() => onAllowDateEdit(!editDate)}
            htmlType="button"
            widthB="90%"
            label=""
            icon={<EditOutlined />}
          />
        </Col>
      </Row>
    );
  return (
    <>
      <JoiDatePicker label="Fecha" name="date" validation={validation} />
    </>
  );
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function OrderForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    editDate,
    onAllowDateEdit
  } = props;
  const { items, _id, date, totalCosto, totalVenta } = defaultValues;
  const fixedDefaultValues = fixDate();

  function fixDate() {
    return { ...defaultValues, date: dateMongoToMoment(date) };
  }

  return (
    <div className="store-cart-form-container">
      <Form
        initialValues={fixedDefaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
      >
        <Row gutter={[15, 0]}>
          <Col xs={24} sm={24} lg={24}>
            <h2>
              Orden: <span>{_id}</span>
            </h2>
          </Col>
          <Col xs={24} sm={24} lg={15}>
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={24} lg={12}>
                <DateSection
                  onAllowDateEdit={onAllowDateEdit}
                  editDate={editDate}
                  date={date}
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <JustData
                  label="Productos vendidos"
                  name={items ? items.length : 0}
                />
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <JustData label="Venta" name={priceFormat(totalVenta)} />
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <JustData label="Costo" name={priceFormat(totalCosto)} />
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <JustData
                  label="Utilidad"
                  name={priceFormat(totalVenta - totalCosto)}
                />
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
                  disabled
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
            </Row>
          </Col>
          <Col xs={24} sm={24} lg={9}>
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={24} lg={24}>
                <JoiSelectInput
                  label="Responsable de Venta"
                  name="responsableVenta"
                  options={appData.responsables}
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={24}>
                <JoiSelectInput
                  label="Estatus"
                  name="estatus"
                  options={catalogos.ordenes.estatus}
                  validation={validation}
                />
              </Col>
              <Col xs={24} sm={24} lg={24}>
                <h3>
                  <span>Datos del cliente:</span>
                </h3>
              </Col>
              <ClientForm validation={validation} />
            </Row>
          </Col>
          <Col xs={24} sm={24} lg={{ offset: 2, span: 20 }}>
            {items && items.length > 0 && <ItemList items={items} />}
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

export default OrderForm;
