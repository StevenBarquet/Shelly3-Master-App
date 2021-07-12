// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import OrderForm from 'Comp/EditOrder/OrderForm';
// ---Common Comps
import SearchPush from 'CComps/SearchPush';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getOneOrder, updateOrder } from 'Others/peticiones.js';
// ---Others
import { isId, ignoreArgs, removeEmptyAndNull } from 'Others/otherMethods';
import { messagesSchema } from './EditOrdersSchema';
import { dateFormToServerFull } from 'Others/dateMethods';
// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  UPDATE_FORM: 'UPDATE_FORM',
  UPDATE_DATE_FLAG: 'UPDATE_DATE_FLAG',
  START_RELOAD: 'START_RELOAD'
};

const {
  START_RELOAD,
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_DATE_FLAG
} = typesR;

const initialState = {
  msgSchema: messagesSchema,
  form: {},
  editDate: false,
  isValidForm: true
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case RESET_VALIDATIONS:
      return {
        ...state,
        isValidForm: true,
        msgSchema: messagesSchema
      };

    case UPDATE_FORM:
      return {
        ...state,
        form: { ...state.form, ...payload }
      };

    case UPDATE_DATE_FLAG:
      return {
        ...state,
        editDate: payload
      };

    case typesR.START_RELOAD:
      return {
        ...state,
        form: { ...state.form, ...payload },
        isValidForm: true,
        msgSchema: messagesSchema
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function EditOrders() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ReRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));
  // Redux States
  const { currentParams } = useSelector(reducers => reducers.appInfoReducer);
  const dispatchR = useDispatch();
  // Redux Actions
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => getOrderData(), [currentParams]);

  // ----------------------- Metodos Principales
  function getOrderData() {
    const urlID = getID(currentParams);
    if (urlID) {
      isLoading(true);
      asyncHandler(getOneOrder, onSuccessSearch, onError, urlID);
    }
  }
  function updateOrderData() {
    isLoading(true);
    const fixedData = formatDataForRequest(state.form);
    asyncHandler(updateOrder, onSuccessGen, onError, fixedData);
  }
  function onAllowDateEdit(flag) {
    dispatch({
      type: UPDATE_DATE_FLAG,
      payload: flag
    });
  }
  function onChangeForm(formData) {
    const fixDate = fixDateProp(formData);
    dispatch({ type: RESET_VALIDATIONS });
    onAllowDateEdit(false);
    dispatch({
      type: UPDATE_FORM,
      payload: fixDate
    });
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  // ----------------------- Metodos Auxiliares
  function fixDateProp(formData) {
    const propertyKey = Object.keys(formData)[0];
    if (propertyKey !== 'date') {
      return formData;
    }
    return { date: dateFormToServerFull(formData.date) };
  }
  function getID(value) {
    if (value && value === '') {
      // Si la url no contiene id resetea el form
      onChangeForm({});
      return false;
    }
    if (value && value.length === 25) {
      const urlID = value.substring(1, value.length);
      return isId(urlID) ? urlID : false;
    }
    return false;
  }
  function onSuccessSearch(data) {
    const fixedData = fitDataToForm(data);
    dispatch({ type: START_RELOAD, payload: fixedData });
    isLoading(false);
    setReRender(true);
  }
  function onSuccessGen() {
    isLoading(false);
  }
  function fitDataToForm(data) {
    const { cobroAdicional } = data;
    let newData;
    if (cobroAdicional) {
      const { concepto, cantidad } = cobroAdicional;
      newData = { ...data, concepto, cantidad };
    } else newData = { ...data };
    const ignore = ['__v', 'cobroAdicional'];
    newData = ignoreArgs(newData, ignore);
    return newData;
  }
  function formatDataForRequest(data) {
    const { concepto, cantidad } = data;
    const cobroAdicional = cantidad ? { concepto, cantidad } : null;

    const ignore = ['concepto', 'cantidad'];
    let newData = ignoreArgs(data, ignore);

    const { telefono } = newData;
    newData = telefono
      ? { ...newData, telefono: telefono.toString() }
      : newData;
    newData = { ...newData, cobroAdicional };

    return removeEmptyAndNull(newData);
  }

  return (
    <StoreMenuCont>
      <SearchPush labelID="ID de la orden" pushPath="/master/editOrder" />
      {!ReRender && (
        <OrderForm
          defaultValues={state.form || {}}
          onChangeForm={onChangeForm}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          onSubmit={updateOrderData}
          editDate={state.editDate}
          onAllowDateEdit={onAllowDateEdit}
        />
      )}
    </StoreMenuCont>
  );
}

export default EditOrders;
