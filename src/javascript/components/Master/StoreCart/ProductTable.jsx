/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table, Pagination } from 'antd';
// --Others
import { priceFormat } from 'Others/otherMethods';

const ProductTable = props => {
  const {
    products,
    current,
    pageSize,
    total,
    onPageChange,
    onShowCard,
    addToCart
  } = props;
  let dataSource = [];
  products.forEach(item => {
    if (item.disponibles > 0)
      dataSource = [...dataSource, { ...item, key: item._id }];
  }); // add key prop and filter disponibles < 0

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      fixed: 'left'
    },
    {
      title: 'Precio',
      dataIndex: 'precioPlaza',
      key: 'precioPlaza',
      render: precioPlaza => <span>{priceFormat(precioPlaza)}</span>
    },
    {
      title: 'Consulta',
      dataIndex: '_id',
      key: '_id',
      render: (_id, fullData) => (
        <Button onClick={() => onShowCard(fullData)} type="primary">
          Vistazo
        </Button>
      )
    },
    {
      title: 'Carrito',
      dataIndex: '_id',
      key: '_id',
      render: (_id, fullData) => (
        <Button onClick={() => addToCart(fullData)} type="outline">
          Agregar
        </Button>
      )
    },
    {
      title: 'Disponibles',
      dataIndex: 'disponibles',
      key: 'disponibles'
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Portada',
      dataIndex: 'images',
      key: 'images',
      fixed: 'right',
      render: images => (
        <span>
          <img src={images.cover} alt="vmo" width="40px" />
        </span>
      )
    }
  ];

  //   function onShowSizeChange(current2, pageSize2) {
  //     console.log('onShowSizeChange', current2, pageSize2);
  //   }
  return (
    <React.Fragment>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 900 }}
      />
      <Pagination
        style={{ margin: '15px auto 0px auto' }}
        onShowSizeChange={onPageChange}
        pageSizeOptions={[20, 30, 50, 100]}
        showSizeChanger
        current={current}
        pageSize={pageSize}
        onChange={onPageChange}
        total={total}
      />
    </React.Fragment>
  );
};

export default ProductTable;
