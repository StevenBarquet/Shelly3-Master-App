// ---Dependencys
import React from 'react';
import { Form, Row, Col, Input, Select, Switch, InputNumber } from 'antd';
import { EditOutlined, PlusOutlined, ClearOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
import mapOptions from 'CommonComps/mapOptions';
// ---Others
import { productos } from 'Others/store-data.json';

// --------------------------------------- FORM COMPONENT --------------------------------------
function ProductForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm,
    isEdit,
    onClearForm
  } = props;

  const {
    _id,
    marca,
    nombre,
    imagesCover,
    imagesExtra1,
    imagesExtra2,
    imagesExtra3,
    imagesMini,
    costo,
    precioPlaza,
    precioOnline,
    disponibles,
    online,
    nuevo,
    descripcion,
    estetica,
    categoria,
    subcategoria,
    descuento
  } = validation;
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
  const descuentoOptions = [
    {
      label: '0%',
      value: 0
    },
    {
      label: '10%',
      value: 10
    },
    {
      label: '20%',
      value: 20
    },
    {
      label: '30%',
      value: 30
    },
    {
      label: '40%',
      value: 40
    },
    {
      label: '50%',
      value: 50
    },
    {
      label: '60%',
      value: 60
    },
    {
      label: '70%',
      value: 70
    },
    {
      label: '80%',
      value: 80
    },
    {
      label: '90%',
      value: 90
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
          <Col xs={24} sm={24} lg={24}>
            <h2>Datos del producto</h2>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="ID"
              name="_id"
              validateStatus={_id.status}
              help={_id.status === 'error' ? _id.message : null}
              rules={[{ required: false, message: _id.message }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Nombre"
              name="nombre"
              validateStatus={nombre.status}
              help={nombre.status === 'error' ? nombre.message : null}
              rules={[{ required: false, message: nombre.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Marca"
              name="marca"
              validateStatus={marca.status}
              help={marca.status === 'error' ? marca.message : null}
              rules={[{ required: false, message: marca.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Costo"
              name="costo"
              validateStatus={costo.status}
              help={costo.status === 'error' ? costo.message : null}
              rules={[{ required: false, message: costo.message }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Precio local"
              name="precioPlaza"
              validateStatus={precioPlaza.status}
              help={precioPlaza.status === 'error' ? precioPlaza.message : null}
              rules={[{ required: false, message: precioPlaza.message }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Precio online"
              name="precioOnline"
              validateStatus={precioOnline.status}
              help={
                precioOnline.status === 'error' ? precioOnline.message : null
              }
              rules={[{ required: false, message: precioOnline.message }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Online"
              name="online"
              validateStatus={online.status}
              help={online.status === 'error' ? online.message : null}
              rules={[{ required: false, message: online.message }]}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Nuevo"
              name="nuevo"
              validateStatus={nuevo.status}
              help={nuevo.status === 'error' ? nuevo.message : null}
              rules={[{ required: false, message: nuevo.message }]}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Form.Item
              label="Disponibles"
              name="disponibles"
              validateStatus={disponibles.status}
              help={disponibles.status === 'error' ? disponibles.message : null}
              rules={[{ required: false, message: disponibles.message }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <Form.Item
              label="Descripcion"
              name="descripcion"
              validateStatus={descripcion.status}
              help={descripcion.status === 'error' ? descripcion.message : null}
              rules={[{ required: false, message: descripcion.message }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Estética"
              name="estetica"
              validateStatus={estetica.status}
              help={estetica.status === 'error' ? estetica.message : null}
              rules={[{ required: false, message: estetica.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Descuento"
              name="descuento"
              validateStatus={descuento.status}
              help={descuento.status === 'error' ? descuento.message : null}
              rules={[{ required: false, message: descuento.message }]}
            >
              <Select>{mapOptions(descuentoOptions)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Categoria"
              name="categoria"
              validateStatus={categoria.status}
              help={categoria.status === 'error' ? categoria.message : null}
              rules={[{ required: false, message: categoria.message }]}
            >
              <Select>{mapOptions(productos.categorias)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Subcategoria"
              name="subcategoria"
              validateStatus={subcategoria.status}
              help={
                subcategoria.status === 'error' ? subcategoria.message : null
              }
              rules={[{ required: false, message: subcategoria.message }]}
            >
              <Select>{mapOptions(genderOptions)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Portada URL"
              name="imagesCover"
              validateStatus={imagesCover.status}
              help={imagesCover.status === 'error' ? imagesCover.message : null}
              rules={[{ required: false, message: imagesCover.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Portada ligera URL"
              name="imagesMini"
              validateStatus={imagesMini.status}
              help={imagesMini.status === 'error' ? imagesMini.message : null}
              rules={[{ required: false, message: imagesMini.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="URL img extra 1"
              name="imagesExtra1"
              validateStatus={imagesExtra1.status}
              help={
                imagesExtra1.status === 'error' ? imagesExtra1.message : null
              }
              rules={[{ required: false, message: imagesExtra1.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="URL img extra 2"
              name="imagesExtra2"
              validateStatus={imagesExtra2.status}
              help={
                imagesExtra2.status === 'error' ? imagesExtra2.message : null
              }
              rules={[{ required: false, message: imagesExtra1.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="URL img extra 3"
              name="imagesExtra3"
              validateStatus={imagesExtra3.status}
              help={
                imagesExtra3.status === 'error' ? imagesExtra3.message : null
              }
              rules={[{ required: false, message: imagesExtra1.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* Finish Form */}
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
                    variant="blue-outline"
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
                    label={isEdit ? 'Editar producto' : 'Agregar producto'}
                    icon={isEdit ? <EditOutlined /> : <PlusOutlined />}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
// ------------------------------------------ CONTAINER-----------------------------------------

export default ProductForm;
