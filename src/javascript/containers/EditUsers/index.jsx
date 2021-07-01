// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Components
import EditUsersForm from 'Comp/EditUsers/EditUsersForm';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getOneUserMail, editProfileReq } from 'Others/peticiones.js';
// ---Others
import { joiFormValidate, messagesSchema } from './EditUsersSchema';
import { removeEmptyAndNull, ignoreArgs } from 'Others/otherMethods';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM',
  UPDATE_FULL_FORM: 'UPDATE_FULL_FORM'
};

const {
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_MSGSCHEMA,
  RESET_FORM,
  UPDATE_FULL_FORM
} = typesR;

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

    case UPDATE_FULL_FORM:
      return {
        ...state,
        form: payload,
        isValidForm: true,
        msgSchema: messagesSchema
      };

    default:
      return state;
  }
}
// ------------------------------------------ CONTAINER-----------------------------------------
function EditUsers() {
  // ----------------------- hooks, const, props y states
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));
  // Redux States
  const { sessionData } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => getUserData(), [sessionData.mail]);

  // ----------------------- Metodos Principales
  function getUserData() {
    const { mail } = sessionData;
    if (mail && !state.form._id) {
      asyncHandler(getOneUserMail, onSuccessSearch, onError, { mail });
    }
  }
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
      const fiexedData = fixDataForRequest(state.form);
      editUser(fiexedData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function onClearForm() {
    dispatch({ type: RESET_FORM });
    setReRender(true);
  }
  // ----------------------- Metodos Auxiliares
  function fitDataToForm(data) {
    const { phone, otherPhone } = data;
    const fixedPhone = phone ? parseInt(phone, 10) : null;
    const fixedOtherPhone = otherPhone ? parseInt(otherPhone, 10) : null;
    const fixedData = {
      ...data,
      phone: fixedPhone,
      otherPhone: fixedOtherPhone
    };
    return removeEmptyAndNull(fixedData);
  }
  function fixDataForRequest(data) {
    const { phone, otherPhone } = data;
    const fixedPhone = phone ? phone.toString() : null;
    const fixedOtherPhone = otherPhone ? otherPhone.toString() : null;
    let fixedData = {
      ...data,
      phone: fixedPhone,
      otherPhone: fixedOtherPhone
    };
    fixedData = ignoreArgs(fixedData, ['confirmPass']);
    return removeEmptyAndNull(fixedData);
  }
  function editUser(data) {
    asyncHandler(editProfileReq, onSucces, onError, data);
  }
  function onSucces() {
    isLoading(false);
  }
  function onSuccessSearch(data) {
    const fixedFormData = fitDataToForm(data.userData);
    dispatch({ type: UPDATE_FULL_FORM, payload: fixedFormData });
    isLoading(false);
    setReRender(true);
  }
  function onError(err) {
    testError(err);
    isLoading(false);
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
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Editar mi perfil</h1>
      </div>
      <div className="store-cart-form-container">
        {!reRender && (
          <EditUsersForm
            onChangeForm={onChangeForm}
            defaultValues={state.form}
            onSubmit={onSubmit}
            validation={state.msgSchema}
            isValidForm={state.isValidForm}
            withData={state.form._id}
            onClearForm={onClearForm}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}

export default EditUsers;
