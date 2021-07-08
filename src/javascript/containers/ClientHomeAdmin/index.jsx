// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
// ---Redux
import { useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Comp
import HomeForm from 'Comp/ClientHomeAdmin/HomeForm';
import AllBanners from 'Comp/ClientHomeAdmin/AllBanners';
import SubmitMenu from 'Comp/ClientHomeAdmin/SubmitMenu';
// ---Containers
import StoreMenuCont from 'Cont/StoreMenuCont';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getHomeReq } from 'Others/peticiones.js';
// ---Others
import { joiFormValidate, messagesSchema } from './ClientHomeAdminSchema';
import {
  genRandomString,
  ignoreArgs,
  searchObjectByProp,
  arrayWithoutIndex,
  arrayElementSustitution
} from 'Others/otherMethods';

// ---AUX COMPONENTS
function AllForms(props) {
  const {
    reRender,
    defaultValues,
    validation,
    isValidForm,
    homeFormMethods,
    allBannersMethods,
    formInstance,
    bannerFormMethods,
    bannersData
  } = props;
  if (!reRender)
    return (
      <Row gutter={[20, 10]}>
        <Col xs={24} sm={24} lg={8}>
          <HomeForm
            onChangeForm={homeFormMethods.onChangeForm}
            defaultValues={defaultValues}
            validation={validation}
            isValidForm={isValidForm}
            formInstance={formInstance}
          />
        </Col>
        <Col xs={24} sm={24} lg={15}>
          <AllBanners
            allBannersMethods={allBannersMethods}
            bannerFormMethods={bannerFormMethods}
            bannersData={bannersData}
          />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <SubmitMenu
            isValidForm={isValidForm}
            onSubmit={homeFormMethods.onSubmit}
            onClearForm={homeFormMethods.onClearForm}
            formInstance={formInstance}
          />
        </Col>
      </Row>
    );
  return null;
}
// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM',
  UPDATE_FULL_FORM: 'UPDATE_FULL_FORM',
  PUSH_BANNER_ID: 'PUSH_BANNER_ID',
  UPDATE_DO_MEGA_SUBMIT: 'UPDATE_DO_MEGA_SUBMIT',
  UPDATE_FULL_BANNERS: 'UPDATE_FULL_BANNERS',
  OTHER_FORM_VALID_UPDATE: 'OTHER_FORM_VALID_UPDATE'
};

const {
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_MSGSCHEMA,
  RESET_FORM,
  UPDATE_FULL_FORM,
  PUSH_BANNER_ID,
  UPDATE_DO_MEGA_SUBMIT,
  UPDATE_FULL_BANNERS,
  OTHER_FORM_VALID_UPDATE
} = typesR;

const initialState = {
  msgSchema: messagesSchema,
  form: {},
  isValidForm: true,
  doUpdate: false,
  bannersData: {
    bannersArray: [],
    doMegaSubmit: false
  }
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

    case PUSH_BANNER_ID:
      return {
        ...state,
        bannersData: {
          ...state.bannersData,
          bannersArray: [...state.bannersData.bannersArray, payload]
        }
      };

    case UPDATE_FULL_BANNERS:
      return {
        ...state,
        bannersData: {
          ...state.bannersData,
          bannersArray: payload
        }
      };

    case UPDATE_DO_MEGA_SUBMIT:
      return {
        ...state,
        bannersData: {
          ...state.bannersData,
          doMegaSubmit: payload
        }
      };

    case OTHER_FORM_VALID_UPDATE:
      return {
        ...state,
        isValidForm: payload
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
  const [formInstance] = Form.useForm();
  useEffect(() => setReRender(false));
  useEffect(() => getHomeData(), []);
  // Redux Actions
  const dispatchR = useDispatch();
  const isLoading = flag => dispatchR(updateLoading(flag));

  // ---------------------- Compilacion de Metodos
  const bannerFormMethods = {
    onDeleteBanner: someID => onDeleteBanner(someID),
    onMegaSubmit: data => onMegaSubmit(data)
  };

  const homeFormMethods = {
    onChangeForm: obj => onChangeForm(obj),
    onSubmit: formData => onSubmit(formData),
    onClearForm: () => onClearForm()
  };

  const allBannersMethods = {
    createNewBanner: () => createNewBanner()
  };

  // ----------------------- Metodos Principales
  function onChangeForm(obj) {
    //   console.log('onChangeForm: ', obj);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: obj
    });
  }
  function onMegaSubmit(data) {
    console.log('Success: onMegaSubmit ', data);
    onEditBanner(data);
  }
  function onDeleteBanner(someID) {
    const { bannersArray } = state.bannersData;
    const bannerIndex = searchObjectByProp(bannersArray, 'bannerID', someID);
    const newBanners = arrayWithoutIndex(bannersArray, bannerIndex);
    dispatch({ type: UPDATE_FULL_BANNERS, payload: newBanners });
  }
  function onEditBanner(someBanner) {
    const { bannerID } = someBanner;
    const { bannersArray } = state.bannersData;
    const bannerIndex = searchObjectByProp(bannersArray, 'bannerID', bannerID);
    const newBanners = arrayElementSustitution(
      bannersArray,
      bannerIndex,
      someBanner
    );
    dispatch({ type: UPDATE_FULL_BANNERS, payload: newBanners });
  }
  function onSubmit(formData) {
    dispatch({ type: UPDATE_DO_MEGA_SUBMIT, payload: true });
    const { isValid } = validateForm(formData);
    if (isValid) {
      console.log('onSubmit: Success\n', formData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
    dispatch({ type: UPDATE_DO_MEGA_SUBMIT, payload: false });
  }
  function onClearForm() {
    dispatch({ type: RESET_FORM });
    setReRender(true);
  }
  function createNewBanner() {
    const { length } = state.bannersData.bannersArray;
    const bannerID = `${length}${genRandomString(4)}`;
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: PUSH_BANNER_ID,
      payload: { bannerID, doUpdate: false }
    });
    setReRender(true);
  }
  function getHomeData() {
    asyncHandler(getHomeReq, onSuccessGetHome, onError);
  }
  // ----------------------- Metodos Auxiliares
  function onSuccessGetHome(data) {
    console.log('onSuccessGetHome: ', data);
    fitDataToForm(data);
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
  function fitDataToForm(data) {
    buildBannerData(data);
    buildOtherFormData(data);
  }
  function buildBannerData(data) {
    const { banners } = data;
    const newBannerArray = banners.map((banner, index) => {
      const bannerID = `${index}${genRandomString(4)}`;
      return { banner, bannerID, doUpdate: false };
    });
    dispatch({
      type: UPDATE_FULL_BANNERS,
      payload: newBannerArray
    });
  }
  function buildOtherFormData(data) {
    const ignore = ['date', 'banners', 'products', '__v'];
    const newFormData = ignoreArgs(data, ignore);
    dispatch({
      type: UPDATE_FORM,
      payload: newFormData
    });
    setReRender(true);
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Home Page</h1>
      </div>
      <div className="store-cart-form-container">
        <AllForms
          reRender={reRender}
          homeFormMethods={homeFormMethods}
          defaultValues={state.form}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          allBannersMethods={allBannersMethods}
          formInstance={formInstance}
          bannersData={state.bannersData}
          bannerFormMethods={bannerFormMethods}
        />
      </div>
    </StoreMenuCont>
  );
}
export default ClientHomeAdmin;
