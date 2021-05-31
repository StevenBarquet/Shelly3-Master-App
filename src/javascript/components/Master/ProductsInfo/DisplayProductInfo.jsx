// ---Dependencys
import React, { useEffect, useState } from 'react';
import { Descriptions, Badge, Row, Col } from 'antd';
// --CommonComps
import FitImg from 'CommonComps/FitImg';
// --Others
import { priceFormat } from 'Others/otherMethods';

// ------------------------------------------ COMPONENT-----------------------------------------
const DisplayProductInfo = props => {
  // ----------------------- hooks, const, props y states
  const { data } = props;
  const [newExtra, setNewExtra] = useState(['NA', 'NA', 'NA']);
  useEffect(() => setNewExtra(getExtraImages()), [data]);

  // ----------------------- Metodos Auxiliares
  function getExtraImages() {
    if (data.images) {
      const { extra } = data.images;
      const array = [];
      if (extra) {
        for (let index = 0; index < 3; index++) {
          if (extra[index]) array.push(extra[index]);
          else array.push('NA');
        }
        return array;
      }
    }
    return ['NA', 'NA', 'NA'];
  }

  // ----------------------- Render
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="store-form-container">
      <Descriptions bordered>
        <Descriptions.Item label="Producto" span={3}>
          {data.nombre}
        </Descriptions.Item>
        <Descriptions.Item label="Marca">{data.marca}</Descriptions.Item>
        <Descriptions.Item label="id" span={2}>
          {data._id}
        </Descriptions.Item>
        <Descriptions.Item label="Costo">
          {priceFormat(data.costo)}
        </Descriptions.Item>
        <Descriptions.Item label="Precio Local">
          {priceFormat(data.precioPlaza)}
        </Descriptions.Item>
        <Descriptions.Item label="Precio Online">
          {priceFormat(data.precioOnline)}
        </Descriptions.Item>
        <Descriptions.Item label="Online">
          {data.online ? (
            <Badge status="processing" text="Si" />
          ) : (
            <Badge status="error" text="No" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Categoria">
          {data.categoria}
        </Descriptions.Item>
        <Descriptions.Item label="Subcategoria">
          {data.subcategoria}
        </Descriptions.Item>
        <Descriptions.Item label="Nuevo">
          {data.nuevo ? (
            <Badge status="processing" text="Si" />
          ) : (
            <Badge status="error" text="No" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Piezas disponibles">
          {data.disponibles}
        </Descriptions.Item>
        <Descriptions.Item label="Descuento">
          {data.descuento + '%'}
        </Descriptions.Item>
        <Descriptions.Item label="Visitas">
          {data.countVisits}
        </Descriptions.Item>
        <Descriptions.Item label="Preguntas">
          {data.countQuestions}
        </Descriptions.Item>
        <Descriptions.Item label="Compras locales">
          {data.countPurchases}
        </Descriptions.Item>
        <Descriptions.Item label="Compras Online">
          {data.countLocalPurchases}
        </Descriptions.Item>
        <Descriptions.Item label="Descripcion" span={2}>
          {data.descripcion}
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={[15, 30]} className="store-all-images">
        <Col xs={24} sm={24} lg={12}>
          <div className="store-img-container">
            <FitImg
              srcImg={data.images.cover}
              estilo="product-box-img-container"
              alt={data.nombre + ' ' + data.modelo}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={4}>
          <div className="store-img-container">
            <FitImg
              srcImg={newExtra[0]}
              estilo="product-box-img-container"
              alt={data.nombre + ' ' + data.modelo}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={4}>
          <div className="store-img-container">
            <FitImg
              srcImg={newExtra[1]}
              estilo="product-box-img-container"
              alt={data.nombre + ' ' + data.modelo}
            />
          </div>
        </Col>
        <Col xs={12} sm={12} lg={4}>
          <FitImg
            srcImg={newExtra[2]}
            estilo="product-box-img-container"
            alt={data.nombre + ' ' + data.modelo}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DisplayProductInfo;
