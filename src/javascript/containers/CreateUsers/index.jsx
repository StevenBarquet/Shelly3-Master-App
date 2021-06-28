// ---Dependencys
import React, { useReducer, useState, useEffect } from 'react';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Components
import UsersForm from 'Comp/CreateUsers/UsersForm';
// ---Common Comps
import SearchPush from 'CComps/SearchPush';
// ---Others
import { appData } from 'Others/store-data.json';
import { joiFormValidate, messagesSchema } from './CreateUsersSchema';

const { menuRoutes } = appData;

function buildRoutes() {
  let starterForm = {};
  menuRoutes.forEach(roteData => {
    const { routeName } = roteData;
    starterForm = {
      ...starterForm,
      [routeName]: false
    };
  });
  return starterForm;
}

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
  form: buildRoutes(),
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
function CreateUsers() {
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
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Crear o editar cuenta</h1>
      </div>
      <SearchPush labelID="ID de la cuenta" pushPath="/master/createUser" />
      <div className="store-cart-form-container">
        {!reRender && (
          <UsersForm
            onChangeForm={onChangeForm}
            defaultValues={state.form}
            onSubmit={onSubmit}
            validation={state.msgSchema}
            isValidForm={state.isValidForm}
            onClearForm={onClearForm}
            isEdit={state.form._id}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}

export default CreateUsers;
