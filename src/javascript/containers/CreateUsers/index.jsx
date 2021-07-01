// ---Dependencys
import React, { useReducer, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Components
import UsersForm from 'Comp/CreateUsers/UsersForm';
// ---Common Comps
import SearchPush from 'CComps/SearchPush';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { createUserReq, editUserReq, getOneUser } from 'Others/peticiones.js';
// ---Others
import { isId, ignoreArgs, removeEmptyAndNull } from 'Others/otherMethods';
import { appData } from 'Others/store-data.json';
import { joiFormValidate, messagesSchema } from './CreateUsersSchema';

const { menuRoutes } = appData;

function buildRoutes(value) {
  let starterForm = {};
  menuRoutes.forEach(roteData => {
    const { routeName } = roteData;
    starterForm = {
      ...starterForm,
      [routeName]: value
    };
  });
  return starterForm;
}

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
  form: buildRoutes(false),
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
function CreateUsers() {
  // ----------------------- hooks, const, props y states
  const basicRoutes = ['/master', '/master/tienda'];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));
  // Redux States
  const { currentParams } = useSelector(reducers => reducers.appInfoReducer);
  const dispatchR = useDispatch();
  // Redux Actions
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => getUsersData(), [currentParams]);

  // ----------------------- Metodos Principales
  function onChangeForm(obj) {
    //   console.log('onChangeForm: ', obj);
    if (!state.isValidForm) {
      dispatch({ type: RESET_VALIDATIONS });
    }
    dispatch({
      type: UPDATE_FORM,
      payload: obj
    });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      doUserRequest();
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function onClearForm() {
    dispatch({ type: RESET_FORM });
    setReRender(true);
  }
  function getUsersData() {
    const id = getID(currentParams);
    if (id) {
      isLoading(true);
      asyncHandler(getOneUser, onSuccessSearch, onError, { id });
    }
  }
  // ----------------------- Metodos Auxiliares
  function doUserRequest() {
    const fixedData = fitDataToRequest(state.form);
    const { _id } = fixedData;
    if (_id) {
      editUser(fixedData);
    } else {
      createUser(fixedData);
    }
  }
  function createUser(reqData) {
    isLoading(true);
    asyncHandler(createUserReq, onSuccessUserReq, onError, reqData);
  }
  function editUser(reqData) {
    isLoading(true);
    asyncHandler(editUserReq, onSuccessUserReq, onError, reqData);
  }
  function onSuccessUserReq() {
    onClearForm();
    isLoading(false);
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function getID(value) {
    if (value && value === '') {
      onChangeForm({ nuevo: true, online: false, descuento: 0 });
      return false;
    }
    if (value && value.length === 25) {
      const urlID = value.substring(1, value.length);
      return isId(urlID) ? urlID : false;
    }
    return false;
  }
  function validateForm(formData) {
    const validation = joiFormValidate(formData);
    dispatch({
      type: UPDATE_MSGSCHEMA,
      payload: validation
    });
    return validation;
  }
  function onSuccessSearch(data) {
    const fixedData = fitDataToForm(data.user);
    dispatch({ type: UPDATE_FULL_FORM, payload: fixedData });
    isLoading(false);
    setReRender(true);
  }
  function getRouteNames() {
    return menuRoutes.map(routeData => routeData.routeName);
  }
  function fitDataToForm(data) {
    const { phone, otherPhone, authorizedRoutes } = data;
    const fixedPhone = phone ? parseInt(phone, 10) : null;
    const fixedOtherPhone = otherPhone ? parseInt(otherPhone, 10) : null;
    let fixedData = {
      ...data,
      phone: fixedPhone,
      otherPhone: fixedOtherPhone
    };
    const ignore = ['__v', 'authorizedRoutes'];
    const routeNamesObj = getRouteNamesObj(authorizedRoutes);
    fixedData = ignoreArgs(fixedData, ignore);
    fixedData = removeEmptyAndNull(fixedData);
    fixedData = { ...fixedData, ...routeNamesObj };

    // console.log('fitDataToForm: ', fixedData);
    return fixedData;
  }
  function getRouteNamesObj(authorizedRoutes) {
    let routeNamesObj = buildRoutes(false);
    authorizedRoutes.forEach(route => {
      const notBasicRoute = basicRoutes.indexOf(route) === -1;
      if (notBasicRoute) {
        const routeName = route.substring('/master/'.length, route.length);
        routeNamesObj = {
          ...routeNamesObj,
          [routeName]: true
        };
      }
    });
    return routeNamesObj;
  }
  function fitDataToRequest(data) {
    const { phone, otherPhone } = data;
    const fixedPhone = phone ? phone.toString() : null;
    const fixedOtherPhone = otherPhone ? otherPhone.toString() : null;
    let fixedData = {
      ...data,
      phone: fixedPhone,
      otherPhone: fixedOtherPhone
    };
    const allRouteNames = getRouteNames();
    const authorizedRoutes = getAuthRoutes(data, allRouteNames);
    const ignore = ['__v', 'confirmPass', ...allRouteNames];
    fixedData = ignoreArgs(fixedData, ignore);
    fixedData = removeEmptyAndNull(fixedData);
    fixedData = { ...fixedData, authorizedRoutes };

    // console.log('fitDataToRequest: ', fixedData);
    return fixedData;
  }
  function getAuthRoutes(data, routeNames) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let routeArray = [...basicRoutes];
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = values[index];
      if (nameMatch(key, routeNames) && value) {
        routeArray = [...routeArray, `/master/${key}`];
      }
    }
    return routeArray;
  }
  function nameMatch(name, array) {
    let match = false;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (name === element) {
        match = true;
        break;
      }
    }
    return match;
  }
  function changeFormAuthAll(authAll) {
    const routesObj = buildRoutes(authAll);
    dispatch({ type: UPDATE_FORM, payload: routesObj });
    setReRender(true);
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
            changeFormAuthAll={changeFormAuthAll}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}

export default CreateUsers;
