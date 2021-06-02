// ---Dependencys
// ---Dependencys
import React, { useReducer } from 'react';
// import { Card, Form, Input, Row } from 'antd';
// ---Util Comps
// import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/AuthValidate';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---AUX COMPONENTS

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  SOME_CHANGE: 'SOME_CHANGE'
};

const { SOME_CHANGE } = typesR;

const initialState = {
  isUpdated: false,
  utilidades: []
};

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
function UtilityCont() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreMenuCont>
      <span>Ejemplo Simple</span>
    </StoreMenuCont>
  );
}

export default UtilityCont;
