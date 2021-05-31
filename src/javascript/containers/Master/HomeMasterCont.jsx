/* eslint-disable react/destructuring-assignment */
// ---Dependencys
import React from 'react';
import { ArrowLeftOutlined, ArrowUpOutlined } from '@ant-design/icons';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
// ---Redux
import { useSelector } from 'react-redux';

// ------------------------------------------ COMPONENT-----------------------------------------
function HomeMasterCont() {
  // Redux States
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);
  return (
    <StoreMenuCont>
      <div className="store-welcom-container">
        <h1>¡Bienvenido!</h1>
        <h4>Administra tu comercio en el menu</h4>
        <span>{isMovil ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}</span>
      </div>
    </StoreMenuCont>
  );
}
export default HomeMasterCont;
