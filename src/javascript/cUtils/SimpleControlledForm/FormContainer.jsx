// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
// ---Components
import SomeForm from './SomeForm';
// ---Others
import { joiFormValidate, messagesSchema } from './SimpleControlledFormSchema';

const someStyle = {
  width: '94%',
  margin: '30px auto 30px',
  background: 'white',
  display: 'block',
  borderRadius: '2px',
  padding: '10px'
};
// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM'
};

const { RESET_VALIDATIONS, UPDATE_FORM, UPDATE_MSGSCHEMA, RESET_FORM } = typesR;

const initialState = {
  msgSchema: messagesSchema,
  form: {},
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

    case RESET_FORM:
      return {
        ...state,
        ...initialState
      };

    case UPDATE_MSGSCHEMA:
      return {
        ...state,
        isValidForm: payload.isValid,
        msgSchema: payload.messagesSchema
      };

    case UPDATE_FORM:
      return { ...state, form: { ...state.form, ...payload } };

    default:
      return state;
  }
}
// ------------------------------------------ CONTAINER-----------------------------------------
function SimpleControlledForm() {
  // ----------------------- hooks, const, props y states
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));

  // ----------------------- Metodos Principales
  function onChangeForm(obj) {
    //   console.log('onChangeForm: ', obj);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: obj
    });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      console.log('onSubmit: Success\n', formData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function onClearForm() {
    dispatch({ type: RESET_FORM });
    setReRender(true);
  }
  // ----------------------- Metodos Auxiliares
  function validateForm(formData) {
    const validation = joiFormValidate(formData);
    dispatch({
      type: UPDATE_MSGSCHEMA,
      payload: validation
    });
    return validation;
  }
  // ----------------------- Render
  return (
    <div style={someStyle}>
      {!reRender && (
        <SomeForm
          onChangeForm={onChangeForm}
          defaultValues={state.form}
          onSubmit={onSubmit}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          onClearForm={onClearForm}
        />
      )}
    </div>
  );
}

export default SimpleControlledForm;
