// ---Dependencys
import React, { useReducer, useEffect } from 'react';
import { Row, Col } from 'antd';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import DaySelector from 'Comp/UtilityDay/DaySelector';
import UtilitiesTable from 'Comp/Utility/UtilitiesTable';
import UtilitySumary from 'Comp/Utility/UtilitySumary';
import UtilitiesGraph from 'Comp/Utility/UtilitiesGraph';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Others
import { removeEmptyAndNull } from 'Others/otherMethods';
import { dateFormToServer, dateMongoToHours } from 'Others/dateMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { searchUtility } from 'Others/peticiones.js';
// ---AUX COMPONENTS
const MockGraph = () => (
  <div className="container94">
    <img
      src="http://physicsthisweek.com/wp-content/uploads/2014/11/3-2-freefall-mimimum.png"
      alt="Graph"
      width="100%"
    />
  </div>
);
// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  SOME_CHANGE: 'SOME_CHANGE',
  IS_UPDATED: 'IS_UPDATED',
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  UPDATE_DATE: 'UPDATE_DATE',
  NOT_UPDATED: 'NOT_UPDATED'
};

const {
  SOME_CHANGE,
  IS_UPDATED,
  UPDATE_ORDERS,
  UPDATE_DATE,
  NOT_UPDATED
} = typesR;

const initialState = {
  isUpdated: true,
  orders: [],
  orderCount: 0,
  searchParams: {
    filters: {
      startDate: { _d: new Date() },
      finalDate: { _d: new Date() }
    },
    sortBy: '{ "date": -1 }'
  }
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SOME_CHANGE:
      return {
        ...state,
        ...payload
      };

    case IS_UPDATED:
      return {
        ...state,
        isUpdated: true
      };

    case NOT_UPDATED:
      return {
        ...state,
        isUpdated: false
      };

    case UPDATE_ORDERS:
      return {
        ...state,
        orderCount: payload.orderCount,
        orders: payload.orders,
        gData: payload.gData,
        isUpdated: true
      };

    case UPDATE_DATE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          filters: {
            ...state.searchParams.filters,
            startDate: payload.startDate,
            finalDate: payload.finalDate
          }
        }
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function UtilityCont() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Redux States
  // const { currentParams } = useSelector(reducers => reducers.appInfoReducer);
  const dispatchR = useDispatch();
  // Redux Actions
  const isLoading = flag => dispatchR(updateLoading(flag));
  useEffect(() => updatedOrders());

  // ----------------------- Metodos Principales
  function updatedOrders() {
    if (!state.isUpdated) {
      dispatch({ type: IS_UPDATED });
      getAll();
    }
  }
  // ----------------------- Metodos Auxiliares
  function getAll() {
    isLoading(true);
    const fixedData = formatDataForRequest();
    asyncHandler(searchUtility, onSuccessOrder, onError, fixedData);
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function onSuccessOrder(data) {
    updateOrders(data);
    isLoading(false);
  }
  function updateOrders(data) {
    const { orderCount, orders } = data;
    const gData = dataToGraphHours(orders);
    dispatch({
      type: UPDATE_ORDERS,
      payload: { orderCount, orders, gData }
    });
  }
  function formatDataForRequest() {
    const { searchParams } = state;
    const { searchedValue, filters, sortBy } = searchParams;
    const toFix = {
      searchedValue,
      filters: {
        ...filters,
        startDate: formDateFix(filters.startDate),
        finalDate: formDateFix(filters.finalDate)
      },
      sortBy: JSON.parse(sortBy)
    };
    const fixed = removeEmptyAndNull(toFix);

    return fixed;
  }
  function formDateFix(formDate) {
    if (formDate) {
      const date = formDate._d;
      return dateFormToServer(date);
    }
    return null;
  }
  function onDateChange(data) {
    const payload = {
      startDate: data,
      finalDate: data
    };
    dispatch({
      type: UPDATE_DATE,
      payload
    });
    // console.log('onDateChange: ', data);
  }
  function onSearch() {
    dispatch({ type: NOT_UPDATED });
  }
  function dataToGraphHours(orders) {
    let newOrders =
      orders && orders.length && orders.length > 0 ? orders : null;
    if (newOrders) {
      newOrders = orders.map(order => ({
        ...order,
        date: dateMongoToHours(order.date)
      }));
    }

    console.log('dataToGraphHours: ', newOrders);
    return newOrders;
  }
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h2>Utilidad por día</h2>
      </div>
      <Row>
        <Col xs={24} sm={24} lg={8}>
          <UtilitySumary orders={state.orders} />
        </Col>
        <Col xs={24} sm={24} lg={16}>
          <DaySelector onDateChange={onDateChange} onSearch={onSearch} />
        </Col>
        {state.gData && state.gData.length ? (
          <>
            <Col xs={24} sm={24} lg={12}>
              <UtilitiesGraph gData={state.gData} />
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <UtilitiesTable orders={state.orders} />
            </Col>
          </>
        ) : (
          <Col xs={24} sm={24} lg={24}>
            <p>Sin datos para el día o filtros seleccionados</p>
          </Col>
        )}
      </Row>
    </StoreMenuCont>
  );
}

export default UtilityCont;
