/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Components
import { Table } from 'antd';
// --Others
import { priceFormat } from 'Others/otherMethods';
import { dateMongoToClientShort } from 'Others/dateMethods';

const UtilitiesTable = props => {
  const { orders } = props;
  const dataSource =
    orders && orders.length > 0
      ? orders.map(item => ({ ...item, key: item._id }))
      : []; // add key prop

  const columns = [
    {
      title: 'Utilidad',
      dataIndex: 'utility',
      key: 'utility',
      render: utility => <span>{priceFormat(utility)}</span>,
      fixed: 'left'
    },
    {
      title: 'Venta',
      dataIndex: 'totalVenta',
      key: 'totalVenta',
      render: totalVenta => <span>{priceFormat(totalVenta)}</span>
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
      title: 'Responsable de venta',
      dataIndex: 'responsableVenta',
      key: 'responsableVenta'
    },
    {
      title: 'Editar',
      dataIndex: '_id',
      key: '_id',
      render: _id => <Link to={`/master/editOrder?${_id}`}>Editar orden</Link>
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: date => <span>{dateMongoToClientShort(date)}</span>,
      fixed: 'right'
    }
  ];
  if (dataSource && dataSource.length > 0)
    return (
      <div className="container94">
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 740, y: 420 }}
        />
      </div>
    );
  return null;
};

export default UtilitiesTable;
