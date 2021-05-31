// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---ComonComponents
import InvisibleButton from 'CommonComps/InvisibleButton';
import FitImg from 'CommonComps/FitImg';
import CloseButton from 'CommonComps/CloseButton';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// ------------------------------------------ COMPONENT-----------------------------------------
function ProductCard(props) {
  const { onHideCard, data } = props;
  const {
    nombre,
    precioPlaza,
    precioOnline,
    nuevo,
    online,
    disponibles,
    descripcion,
    categoria,
    subcategoria,
    marca,
    _id,
    images
  } = data;
  return (
    <>
      <InvisibleButton callback={onHideCard} />
      <div className="store-product-info-container">
        <Row>
          <Col xs={24} sm={24} lg={14}>
            <h1>{nombre}</h1>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Row>
              <Col span={24}>
                <h2>
                  Precio Online: <span>{priceFormat(precioOnline)}</span>
                </h2>
                <hr />
              </Col>
              <Col span={24}>
                <h3>
                  Precio Mostrador: <span>{priceFormat(precioPlaza)}</span>
                </h3>
              </Col>
            </Row>
          </Col>
          <Col xs={2} sm={2} lg={2}>
            <CloseButton onDeleteButton={onHideCard} value={_id} />
          </Col>
          <Col span={24}>
            <h4>
              Características del producto: <span>{_id}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={10}>
            <FitImg
              srcImg={images ? images.cover : 'none'}
              estilo="card-cover"
              alt={nombre}
            />
          </Col>
          <Col xs={24} sm={24} lg={14}>
            <Row>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Producto nuevo: <span>{nuevo ? 'Si' : 'No'}</span>
                </h5>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Disponible online: <span>{online ? 'Si' : 'No'}</span>
                </h5>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Piezas disponibles: <span>{disponibles}</span>
                </h5>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Categoria: <span>{categoria}</span>
                </h5>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Subcategoria: <span>{subcategoria}</span>
                </h5>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <h5>
                  Marca: <span>{marca}</span>
                </h5>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <section>
              Descripción: <p>{descripcion}</p>
            </section>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductCard;
