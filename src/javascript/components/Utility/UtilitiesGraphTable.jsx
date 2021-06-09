/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Table } from 'antd';
// --Others
import { priceFormat } from 'Others/otherMethods';

const UtilitiesGraphTable = props => {
  const { gData } = props;
  const dataSource =
    gData && gData.length > 0
      ? gData.map(item => ({ ...item, key: item._id }))
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
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: date => <span>{date}</span>,
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
          scroll={{ x: 400, y: 400 }}
        />
      </div>
    );
  return null;
};

export default UtilitiesGraphTable;
