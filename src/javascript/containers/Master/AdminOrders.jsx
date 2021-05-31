// ---Dependencys
import React, { useEffect, useReducer } from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import OrderTable from 'Comp/Master/AdminOrders/OrderTable';
import OrderCard from 'Comp/Master/AdminOrders/OrderCard';
import OrderSearcher from 'Comp/Master/AdminOrders/OrderSearcher';
// ---CommonComps
import ModalConfirmation from 'CommonComps/ModalConfirmation';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { searchOrders, cancelOrderRequest } from 'Others/peticiones.js';
// ---Others
import { removeEmptyAndNull } from 'Others/otherMethods';
import { dateFormToServer } from 'Others/dateMethods';
// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  HIDE_CARD: 'HIDE_CARD',
  VIEW_CARD: 'VIEW_CARD',
  SEARCH_PARMS_CHANGE: 'SEARCH_PARMS_CHANGE',
  NOT_UPDATED: 'NOT_UPDATED',
  IS_UPDATED: 'IS_UPDATED'
};

const {
  UPDATE_ORDERS,
  HIDE_CARD,
  VIEW_CARD,
  SEARCH_PARMS_CHANGE,
  NOT_UPDATED,
  IS_UPDATED
} = typesR;

const searchParamsInitial = {
  pageNumber: 1,
  pageSize: 50,
  searchedValue: '',
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
  searchParams: searchParamsInitial,
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

    case SEARCH_PARMS_CHANGE:
      return {
        ...state,
        searchParams: payload
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

    case IS_UPDATED:
      return {
        ...state,
        isUpdated: true
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
      console.log('get all called');
      dispatch({ type: IS_UPDATED });
      getAll();
    }
  }
  function onCancelButton(data) {
    const question = '¿Deseas cancelar ésta orden?';
    const details = `La utilidad será eliminada y el estatus de orden cambiara a 'Cancelado' permanentemente`;
    ModalConfirmation(question, details, onCancelOrder, data);
  }
  function clearFilters() {
    const { pageNumber, pageSize } = state.searchParams;
    const { searchedValue, sortBy, filters } = searchParamsInitial;
    const payload = {
      pageNumber,
      pageSize,
      searchedValue,
      filters: { ...filters }, // Trick to not mutate searchData
      sortBy
    };
    dispatch({ type: SEARCH_PARMS_CHANGE, payload });
  }
  function onHideCard() {
    dispatch({ type: HIDE_CARD });
  }
  function onViewCard(index) {
    dispatch({ type: VIEW_CARD, payload: index });
  }
  function onPageChange(newPage, newSize) {
    const { searchedValue, filters, sortBy } = state.searchParams;
    const payload = {
      pageNumber: newPage,
      pageSize: newSize,
      searchedValue,
      filters: { ...filters }, // Trick to not mutate searchData
      sortBy
    };
    dispatch({ type: SEARCH_PARMS_CHANGE, payload });
    dispatch({ type: NOT_UPDATED });
  }
  function onFinishForm(params) {
    const { pageNumber, pageSize } = state.searchParams;
    const { searchedValue, sortBy, filters } = params;
    const payload = {
      pageNumber,
      pageSize,
      searchedValue,
      filters: { ...filters }, // Trick to not mutate searchData
      sortBy
    };
    dispatch({ type: SEARCH_PARMS_CHANGE, payload });
    dispatch({ type: NOT_UPDATED });
  }
  // ----------------------- Metodos Auxiliares
  function onCancelOrder(id) {
    isLoading(true);
    asyncHandler(cancelOrderRequest, onSuccessDelete, onError, id);
  }
  function onSuccessDelete() {
    isLoading(false);
    dispatch({ type: NOT_UPDATED });
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function formDateFix(formDate) {
    if (formDate) {
      const date = formDate._d;
      return dateFormToServer(date);
    }
    return null;
  }
  function getAll() {
    isLoading(true);
    const fixedData = formatDataForRequest();
    asyncHandler(searchOrders, onSuccessOrder, onErrorOrder, fixedData);
  }
  function updateOrders(data) {
    const { orderCount, orders } = data;
    dispatch({
      type: UPDATE_ORDERS,
      payload: { orderCount, orders }
    });
  }
  function formatDataForRequest() {
    const { searchParams } = state;
    const {
      pageNumber,
      pageSize,
      searchedValue,
      filters,
      sortBy
    } = searchParams;
    const toFix = {
      pageNumber,
      pageSize,
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
      <OrderSearcher
        onFinishForm={onFinishForm}
        defaultValues={state.searchParams}
        clearFilters={clearFilters}
      />
      {state.orders && state.orders.length > 0 && (
        <OrderTable
          orders={state.orders}
          current={state.searchParams.pageNumber}
          pageSize={state.searchParams.pageSize}
          total={state.orderCount}
          onViewCard={onViewCard}
          onPageChange={onPageChange}
          onCancel={onCancelButton}
        />
      )}
      {state.viewCard && (
        <OrderCard data={state.cardOrder} onHideCard={onHideCard} />
      )}
    </StoreMenuCont>
  );
}
export default AdminOrders;
