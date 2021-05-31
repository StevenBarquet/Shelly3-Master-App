// ---Dependencys
import React, { useReducer } from 'react';
// import { Card, Form, Input, Row } from 'antd';
// ---ComonComponents
// import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';
// ---Containers
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  SOME_CHANGE: 'SOME_CHANGE'
};

const { SOME_CHANGE } = typesR;

const initialState = {};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SOME_CHANGE:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function EditOrders() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreMenuCont>
      <span>Ejemplo Simple</span>
    </StoreMenuCont>
  );
}

export default EditOrders;
