// ---Dependencys
import React, { useReducer } from 'react';
import { Row, Col } from 'antd';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import InventoryMenu from 'Comp/InventoryAnalitics/InventoryMenu';
import MathSumary from 'Comp/InventoryAnalitics/MathSumary';
import MathGraph from 'Comp/InventoryAnalitics/MathGraph';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getAllInventoryReq } from 'Others/peticiones.js';

// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_INVENTORY: 'UPDATE_INVENTORY',
  UPDATE_MATH_DATA: 'UPDATE_MATH_DATA'
};

const { UPDATE_INVENTORY, UPDATE_MATH_DATA } = typesR;

const initialState = {
  inventoryData: [],
  totalCosto: 0,
  totalPrecioLocal: 0,
  totalPrecioOnline: 0,
  totalPurchases: 0
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventoryData: payload
      };

    case UPDATE_MATH_DATA:
      return {
        ...state,
        totalCosto: payload.totalCosto,
        totalPrecioLocal: payload.totalPrecioLocal,
        totalPrecioOnline: payload.totalPrecioOnline,
        totalPurchases: payload.totalPurchases
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function InventoryAnalitics() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));
  // ----------------------- Metodos Principales
  function getInventory() {
    isLoading(true);
    asyncHandler(getAllInventoryReq, onSuccess, onError);
  }
  // ----------------------- Metodos Auxiliares
  function onSuccess(data) {
    isLoading(false);
    const mathData = buildMathData(data);
    dispatch({ type: UPDATE_INVENTORY, payload: data });
    dispatch({ type: UPDATE_MATH_DATA, payload: mathData });
  }

  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function buildMathData(inventoryData) {
    let totalCosto = 0;
    let totalPrecioLocal = 0;
    let totalPrecioOnline = 0;
    let totalPurchases = 0;
    inventoryData.forEach(product => {
      totalCosto += product.costo;
      totalPrecioLocal += product.precioPlaza;
      totalPrecioOnline += product.precioOnline;
      totalPurchases += product.countPurchases || 0;
    });
    return { totalCosto, totalPrecioLocal, totalPrecioOnline, totalPurchases };
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Analiticas de inventario</h1>
      </div>
      <div className="store-content-container">
        <Row gutter={[5, 5]}>
          <Col xs={24} sm={24} lg={24}>
            <InventoryMenu callBack={getInventory} />
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <MathSumary
              inventoryData={state.inventoryData}
              totalCosto={state.totalCosto}
              totalPrecioLocal={state.totalPrecioLocal}
              totalPrecioOnline={state.totalPrecioOnline}
              totalPurchases={state.totalPurchases}
            />
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <MathGraph
              inventoryData={state.inventoryData}
              totalCosto={state.totalCosto}
              totalPrecioLocal={state.totalPrecioLocal}
              totalPrecioOnline={state.totalPrecioOnline}
            />
          </Col>
        </Row>
      </div>
    </StoreMenuCont>
  );
}

export default InventoryAnalitics;
