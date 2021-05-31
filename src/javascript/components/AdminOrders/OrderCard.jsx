// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---ComonComponents
import InvisibleButton from 'CommonComps/InvisibleButton';
import FitImg from 'CommonComps/FitImg';
import CloseButton from 'CommonComps/CloseButton';
// ---Others
import { priceFormat } from 'Others/otherMethods';
import { dateMongoToClient } from 'Others/dateMethods';

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
function Encabezado(props) {
  const { _id, estatus, ventaTipo, onHideCard } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={12}>
        <h1>
          ID: <span>{_id}</span>
        </h1>
      </Col>
      <Col xs={24} sm={24} lg={10}>
        <Row>
          <Col span={24}>
            <h2>
              Estatus: <span>{estatus}</span>
            </h2>
            <hr />
          </Col>
          <Col span={24}>
            <h3>
              Tipo de Venta: <span>{ventaTipo}</span>
            </h3>
          </Col>
        </Row>
      </Col>
      <Col xs={2} sm={2} lg={2}>
        <CloseButton onDeleteButton={onHideCard} value={_id} />
      </Col>
    </>
  );
}
function DatosCliente(props) {
  const { correo, nombre, apellido, telefono } = props;
  return (
    <>
      <Col span={24}>
        <h4>
          Datos del cliente: <span>{nombre}</span>
        </h4>
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <h5>
          Nombre completo: <span>{`${nombre} ${apellido}`}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <h5>
          Correo: <span>{correo}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <h5>
          telefono: <span>{telefono}</span>
        </h5>
      </Col>
    </>
  );
}
function DatosVenta(props) {
  const {
    totalVenta,
    totalCosto,
    length,
    responsableVenta,
    metodoPago,
    date
  } = props;
  return (
    <>
      <Col span={24}>
        <h4>
          Datos de Venta: <span>{dateMongoToClient(date)}</span>
        </h4>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h5>
          Productos vendidos: <span>{length}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h5>
          Responsable de venta: <span>{responsableVenta}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h5>
          Método de pago: <span>{metodoPago}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h5>
          Venta: <span>{priceFormat(totalVenta)}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h5>
          Costos: <span>{priceFormat(totalCosto)}</span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <h3>
          Utilidad: <span>{priceFormat(totalVenta - totalCosto)}</span>
        </h3>
      </Col>
    </>
  );
}
function CobroAdicional(props) {
  const { cobroAdicional } = props;
  return (
    <>
      <Col span={24}>
        <h4>Cobro adicional:</h4>
      </Col>
      <Col xs={24} sm={24} lg={9}>
        <h5>
          Cantidad:
          <span>
            {priceFormat((cobroAdicional && cobroAdicional.cantidad) || null)}
          </span>
        </h5>
      </Col>
      <Col xs={24} sm={24} lg={15}>
        <section>
          Concepto:
          <p>{(cobroAdicional && cobroAdicional.concepto) || null}</p>
        </section>
      </Col>
    </>
  );
}
function DatosEnvio() {
  // const { envio, domicilio } = props;
  return null;
}
// ------------------------------------------ COMPONENT-----------------------------------------
function OrderCard(props) {
  const { onHideCard, data } = props;
  const {
    cobroAdicional,
    items,
    totalVenta,
    totalCosto,
    ventaTipo,
    responsableVenta,
    metodoPago,
    estatus,
    date,
    envio,
    _id,
    domicilio,
    correo,
    nombre,
    apellido,
    telefono
  } = data;
  return (
    <>
      <InvisibleButton callback={onHideCard} />
      <div className="store-product-info-container">
        <Row>
          <Encabezado
            onHideCard={onHideCard}
            ventaTipo={ventaTipo}
            _id={_id}
            estatus={estatus}
          />
          <DatosVenta
            totalVenta={totalVenta}
            length={items.length}
            totalCosto={totalCosto}
            responsableVenta={responsableVenta}
            metodoPago={metodoPago}
            date={date}
          />
          <Col xs={24} sm={24} lg={24}>
            <ItemList items={items} />
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Row>
              <CobroAdicional cobroAdicional={cobroAdicional} />
            </Row>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Row>
              <DatosCliente
                correo={correo}
                nombre={nombre}
                apellido={apellido}
                telefono={telefono}
              />
            </Row>
          </Col>

          <DatosEnvio domicilio={domicilio} envio={envio} />
        </Row>
      </div>
    </>
  );
}

export default OrderCard;
