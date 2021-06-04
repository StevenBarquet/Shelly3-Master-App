// ---Dependencys
import React, { useReducer } from 'react';
// import { Card, Form, Input, Row } from 'antd';
// ---Util Comps
// import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/AuthValidate';

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
function SimpleComp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ----------------------- Metodos Principales
  // ----------------------- Metodos Auxiliares
  return (
    <React.Fragment>
      <span>Ejemplo Simple</span>
    </React.Fragment>
  );
}

export default SimpleComp;
