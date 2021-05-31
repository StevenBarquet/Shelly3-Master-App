/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Components
import { Button, Table, Pagination } from 'antd';
// --Others
import { priceFormat } from 'Others/otherMethods';
import { dateMongoToClientShort } from 'Others/dateMethods';

const OrderTable = props => {
  const {
    orders,
    onCancel,
    current,
    pageSize,
    total,
    onPageChange,
    onViewCard
  } = props;
  const dataSource =
    orders && orders.length > 0
      ? orders.map(item => ({ ...item, key: item._id }))
      : []; // add key prop

  function handleDelete(value) {
    // console.log(value);
    onCancel(value);
  }

  const columns = [
    {
      title: 'Venta',
      dataIndex: 'totalVenta',
      key: 'totalVenta',
      render: totalVenta => <span>{priceFormat(totalVenta)}</span>,
      fixed: 'left'
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Tipo de venta',
      dataIndex: 'ventaTipo',
      key: 'ventaTipo'
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: date => <span>{dateMongoToClientShort(date)}</span>
    },
    {
      title: 'Responsable de venta',
      dataIndex: 'responsableVenta',
      key: 'responsableVenta'
    },

    {
      title: 'Consultar',
      dataIndex: '_id',
      key: '_id',
      render: (_id, fullData) => (
        <Button onClick={() => onViewCard(fullData)} type="primary">
          Vistazo
        </Button>
      )
    },
    {
      title: 'Editar',
      dataIndex: '_id',
      key: '_id',
      render: _id => <Link to={`/master/editOrder?${_id}`}>Editar orden</Link>
    },
    {
      title: 'Cancelar',
      dataIndex: '_id',
      key: '_id',
      render: (_id, fullData) => (
        <Button
          disabled={fullData && fullData.estatus === 'Cancelado'}
          onClick={() => handleDelete(_id)}
          type="danger"
        >
          Cancelar
        </Button>
      )
    },
    {
      title: 'Método de pago',
      dataIndex: 'metodoPago',
      key: 'metodoPago'
    },
    {
      title: 'Estatus',
      dataIndex: 'estatus',
      key: 'estatus',
      fixed: 'right'
    }
  ];

  return (
    <React.Fragment>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1400, y: 550 }}
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

export default OrderTable;
