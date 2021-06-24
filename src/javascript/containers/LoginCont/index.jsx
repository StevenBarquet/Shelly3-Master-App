// ---Dependencys
import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import LoginForm from 'Comp/Login/LoginForm';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { logIn } from 'Others/peticiones.js';
// ---Others
import { joiFormValidate, messagesSchema } from './LoginContSchema';

const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS'
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.RESET_VALIDATIONS:
      return {
        ...state,
        isValidForm: true,
        msgSchema: messagesSchema
      };

    case typesR.UPDATE_MSGSCHEMA:
      return {
        ...state,
        isValidForm: payload.isValid,
        msgSchema: payload.messagesSchema
      };

    case typesR.UPDATE_FORM:
      return { ...state, form: { ...state.form, ...payload } };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function LoginCont() {
  // ----------------------- hooks, const, props y states
  const { RESET_VALIDATIONS, UPDATE_FORM, UPDATE_MSGSCHEMA } = typesR;
  const initalState = {
    msgSchema: messagesSchema,
    form: {},
    isValidForm: true
  };
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initalState);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));

  // ----------------------- Metodos Principales
  function onChangeForm(obj) {
    // console.log('onChangeForm: ', obj);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: obj
    });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      // console.log('onSubmit: Success\n', formData);
      logInRequest(formData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }

  // ----------------------- Metodos Auxiliares
  function logInRequest(loginData) {
    isLoading(true);
    asyncHandler(logIn, onSuccessLogIn, onErrorLogIn, loginData);
  }

  function onSuccessLogIn() {
    isLoading(false);
    history.push('/master/tienda');
  }

  function onErrorLogIn(data) {
    isLoading(false);
    testError(data);
  }

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
    <LoginForm
      onChangeForm={onChangeForm}
      defaultValues={state.form}
      onSubmit={onSubmit}
      validation={state.msgSchema}
      isValidForm={state.isValidForm}
    />
  );
}

export default LoginCont;
