/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Components
import { Button, Table } from 'antd';

const UsersTable = props => {
  const { users, onDelete } = props;
  const dataSource =
    users && users.length > 0
      ? users.map(item => ({ ...item, key: item._id }))
      : []; // add key prop

  function handleDelete(value) {
    // console.log(value);
    onDelete(value);
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'fullName',
      key: 'fullName',
      fixed: 'left'
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Correo',
      dataIndex: 'mail',
      key: 'mail'
    },
    {
      title: 'Editar',
      dataIndex: '_id',
      key: '_id',
      render: _id => <Link to={`/master/createUser?${_id}`}>Editar cuenta</Link>
    },
    {
      title: 'Eliminar',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={() => handleDelete(_id)} type="danger">
          Eliminar cuenta
        </Button>
      )
    }
  ];

  return (
    <React.Fragment>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 800, y: 550 }}
      />
    </React.Fragment>
  );
};

export default UsersTable;
