// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
// ---Comp
import HomeForm from 'Comp/ClientHomeAdmin/HomeForm';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Others
import { joiFormValidate, messagesSchema } from './ClientHomeAdminSchema';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM',
  UPDATE_FULL_FORM: 'UPDATE_FULL_FORM',
  UPDATE_BANNER_COUNT: 'UPDATE_BANNER_COUNT'
};

const {
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_MSGSCHEMA,
  RESET_FORM,
  UPDATE_FULL_FORM,
  UPDATE_BANNER_COUNT
} = typesR;

const initialState = {
  msgSchema: messagesSchema,
  form: {},
  isValidForm: true,
  bannerCount: []
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

    case UPDATE_FULL_FORM:
      return {
        ...state,
        form: payload,
        isValidForm: true,
        msgSchema: messagesSchema
      };

    case UPDATE_BANNER_COUNT:
      return {
        ...state,
        bannerCount: payload
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function ClientHomeAdmin() {
  // ----------------------- hooks, const, props y states
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));
  useEffect(() => getBannerCount(state.form), [state.form]);

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
  function createNewBanner() {
    const newBanner = { [`imgDesk${state.bannerCount.length}`]: '' };
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: newBanner
    });
    setReRender(true);
  }
  function getBannerCount(data) {
    const formKeys = Object.keys(data);
    let bannersIndex = [];
    for (let i = 0; i < formKeys.length; i++) {
      const key = formKeys[i];
      const subKeyName = key.substr(0, 'imgDesk'.length);
      if (subKeyName === 'imgDesk') {
        const index = parseInt(key.substr('imgDesk'.length, key.length), 10);
        bannersIndex = [...bannersIndex, index];
      }
    }
    console.log('getBannerCount bannersIndex: ');
    dispatch({
      type: UPDATE_BANNER_COUNT,
      payload: bannersIndex
    });
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Home Page</h1>
      </div>
      <div className="store-cart-form-container">
        {!reRender && (
          <HomeForm
            onChangeForm={onChangeForm}
            defaultValues={state.form}
            onSubmit={onSubmit}
            validation={state.msgSchema}
            isValidForm={state.isValidForm}
            onClearForm={onClearForm}
            bannerCount={state.bannerCount}
            createNewBanner={createNewBanner}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}
export default ClientHomeAdmin;
