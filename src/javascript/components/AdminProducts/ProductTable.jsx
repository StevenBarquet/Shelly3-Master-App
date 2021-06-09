/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Components
import { Button, Table, Pagination } from 'antd';
// --Others
import { priceFormat } from 'Others/otherMethods';

const ProductTable = props => {
  const { products, onDelete, current, pageSize, total, onPageChange } = props;
  const dataSource = products.map(item => ({ ...item, key: item._id })); // add key prop

  function handleDelete(value) {
    console.log(value);
    onDelete(value);
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      fixed: 'left'
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Precio Online',
      dataIndex: 'precioOnline',
      key: 'precioOnline',
      render: precioOnline => <span>{priceFormat(precioOnline)}</span>
    },
    {
      title: 'Descuento',
      dataIndex: 'descuento',
      key: 'descuento',
      render: descuento => <span>{descuento + '%'}</span>
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      render: categoria => <span>{categoria[0]}</span>
    },
    {
      title: 'Borrar',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={() => handleDelete(_id)} type="danger">
          Borrar
        </Button>
      )
    },
    {
      title: 'Editar',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Link to={`/master/addProductos?${_id}`}>editar producto</Link>
      )
    },
    {
      title: 'Consulta',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Link to={`/master/productInfo?${_id}`}>info completa</Link>
      )
    },
    {
      title: 'Disponibles',
      dataIndex: 'disponibles',
      key: 'disponibles'
    },
    {
      title: 'Nuevo',
      dataIndex: 'nuevo',
      key: 'nuevo',
      render: nuevo => <span>{nuevo ? 'Si' : 'No'}</span>
    },
    {
      title: 'Visible online',
      dataIndex: 'online',
      key: 'online',
      render: online => <span>{online ? 'Si' : 'No'}</span>
    },
    {
      title: 'Visitas',
      dataIndex: 'countVisits',
      key: 'countVisits'
    },
    {
      title: 'Preguntas',
      dataIndex: 'countQuestions',
      key: 'countQuestions'
    },
    {
      title: 'Ventas locales',
      dataIndex: 'countLocalPurchases',
      key: 'countLocalPurchases'
    },
    {
      title: 'Ventas online',
      dataIndex: 'countPurchases',
      key: 'countPurchases'
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
        scroll={{ x: 1800 }}
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
