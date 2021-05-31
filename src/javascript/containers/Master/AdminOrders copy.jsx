// -----------------------------Copia de Admin Orders antes del buscador
// ---Dependencys
import React, { useEffect, useReducer } from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import OrderTable from 'Comp/Master/AdminOrders/OrderTable';
import OrderCard from 'Comp/Master/AdminOrders/OrderCard';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// --Request
import { asyncHandler } from 'Others/requestHandlers.js';
import { searchOrders } from 'Others/peticiones.js';
// ---Others
import { removeEmptyAndNull } from 'Others/otherMethods';

// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  HIDE_CARD: 'HIDE_CARD',
  VIEW_CARD: 'VIEW_CARD',
  PAGE_CHANGE: 'PAGE_CHANGE',
  NOT_UPDATED: 'NOT_UPDATED'
};

const {
  UPDATE_ORDERS,
  HIDE_CARD,
  VIEW_CARD,
  PAGE_CHANGE,
  NOT_UPDATED
} = typesR;

const searchParams = {
  pageNumber: 1,
  pageSize: 50,
  searchedValue: null,
  filters: {
    finalDate: null,
    startDate: null,
    ventaTipo: null,
    metodoPago: null,
    estatus: null
  },
  sortBy: '{ "date": -1 }' // Desde fecha más reciente
};

const initialState = {
  searchParams,
  orderCount: 0,
  orders: [],
  viewCard: false,
  cardOrder: {},
  isUpdated: false
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ORDERS:
      return {
        ...state,
        orderCount: payload.orderCount,
        orders: payload.orders,
        isUpdated: true
      };

    case PAGE_CHANGE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageNumber: payload.newPage,
          pageSize: payload.newSize
        }
      };

    case HIDE_CARD:
      return {
        ...state,
        viewCard: false
      };

    case VIEW_CARD:
      return {
        ...state,
        viewCard: true,
        cardOrder: payload
      };

    case NOT_UPDATED:
      return {
        ...state,
        isUpdated: false
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function AdminOrders() {
  // ----------------------- hooks, const, props y states
  const [state, dispatch] = useReducer(reducer, initialState);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => updatedOrders(), [state]);

  // ----------------------- Metodos Principales
  function updatedOrders() {
    if (!state.isUpdated) {
      getAll();
    }
  }
  function onHideCard() {
    dispatch({ type: HIDE_CARD });
  }
  function onViewCard(index) {
    dispatch({ type: VIEW_CARD, payload: index });
  }
  function onPageChange(newPage, newSize) {
    const payload = { newPage, newSize };
    dispatch({ type: PAGE_CHANGE, payload });
    dispatch({ type: NOT_UPDATED });
  }
  // ----------------------- Metodos Auxiliares
  function getAll() {
    isLoading(true);
    const fixedData = formatDataForRequest(state.searchParams);
    asyncHandler(searchOrders, onSuccessOrder, onErrorOrder, fixedData);
  }
  function updateOrders(data) {
    const { orderCount, orders } = data;
    dispatch({
      type: UPDATE_ORDERS,
      payload: { orderCount, orders }
    });
  }
  function formatDataForRequest(data) {
    return {
      ...removeEmptyAndNull(data),
      sortBy: JSON.parse(data.sortBy)
    };
  }
  function onSuccessOrder(data) {
    updateOrders(data);
    isLoading(false);
  }
  function onErrorOrder(response) {
    isLoading(false);
    console.log('testError este: --->', response);
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Ordenes</h1>
      </div>
      <div className="store-content-container">
        <p>Buscador de Ordenes</p>
        <p>
          Tabla de ordenes: Carga desde el principio las más recientes, con
          boton de vistazo y edicion de ordenes
        </p>
      </div>
      <OrderTable
        orders={state.orders}
        current={state.searchParams.pageNumber}
        pageSize={state.searchParams.pageSize}
        total={state.orderCount}
        onViewCard={onViewCard}
        onPageChange={onPageChange}
      />
      {state.viewCard && (
        <OrderCard data={state.cardOrder} onHideCard={onHideCard} />
      )}
    </StoreMenuCont>
  );
}
export default AdminOrders;
