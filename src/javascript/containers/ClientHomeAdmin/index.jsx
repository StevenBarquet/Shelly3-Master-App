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
  joiFormValidate as joiFormValidateBanner,
  messagesSchema as messagesSchemaBanner
} from './SomeBannerContSchema';
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
    allBannersData
  } = props;
  return (
    <Row gutter={[20, 10]}>
      <Col xs={24} sm={24} lg={8}>
        {!reRender && (
          <HomeForm
            onChangeForm={homeFormMethods.onChangeForm}
            defaultValues={defaultValues}
            validation={validation}
            isValidForm={isValidForm}
            formInstance={formInstance}
          />
        )}
      </Col>
      <Col xs={24} sm={24} lg={15}>
        <AllBanners
          allBannersMethods={allBannersMethods}
          bannerFormMethods={bannerFormMethods}
          allBannersData={allBannersData}
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
}
// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM',
  UPDATE_FULL_FORM: 'UPDATE_FULL_FORM',
  PUSH_BANNER_ID: 'PUSH_BANNER_ID',
  UPDATE_IS_EDIT_BANNER_FLAG: 'UPDATE_IS_EDIT_BANNER_FLAG',
  UPDATE_FULL_BANNERS: 'UPDATE_FULL_BANNERS',
  OTHER_FORM_VALID_UPDATE: 'OTHER_FORM_VALID_UPDATE',
  UPDATE_MSGSCHEMA_BANNER: 'UPDATE_MSGSCHEMA_BANNER',
  UPDATE_FORM_BANNER: 'UPDATE_FORM_BANNER',
  UPDATE_FULL_FORM_BANNER: 'UPDATE_FULL_FORM_BANNER',
  RESET_FORM_BANNER: 'RESET_FORM_BANNER'
};

const {
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_MSGSCHEMA,
  RESET_FORM,
  UPDATE_FULL_FORM,
  PUSH_BANNER_ID,
  UPDATE_IS_EDIT_BANNER_FLAG,
  UPDATE_FULL_BANNERS,
  UPDATE_MSGSCHEMA_BANNER,
  UPDATE_FORM_BANNER,
  UPDATE_FULL_FORM_BANNER,
  RESET_FORM_BANNER
} = typesR;

const initialState = {
  msgSchema: messagesSchema,
  homeForm: {},
  isValidForm: true,
  allBannersData: {
    editBannerForm: {},
    msgSchema: messagesSchemaBanner,
    isValidForm: true,
    isEditingBanner: false,
    bannersArray: []
  }
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case RESET_VALIDATIONS:
      return {
        ...state,
        msgSchema: messagesSchema,
        homeForm: {},
        isValidForm: true
      };

    case RESET_FORM:
      return {
        ...state,
        msgSchema: messagesSchema,
        isValidForm: true,
        homeForm: { _id: state.homeForm._id }
      };

    case RESET_FORM_BANNER:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          editBannerForm: {},
          isValidForm: true,
          msgSchema: messagesSchemaBanner
        }
      };

    case UPDATE_MSGSCHEMA:
      return {
        ...state,
        isValidForm: payload.isValid,
        msgSchema: payload.messagesSchema
      };

    case UPDATE_MSGSCHEMA_BANNER:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          isValidForm: payload.isValid,
          msgSchema: payload.messagesSchema
        }
      };

    case UPDATE_FORM:
      return { ...state, homeForm: { ...state.homeForm, ...payload } };

    case UPDATE_FORM_BANNER:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          editBannerForm: { ...state.allBannersData.editBannerForm, ...payload }
        }
      };

    case UPDATE_FULL_FORM:
      return {
        ...state,
        homeForm: payload,
        isValidForm: true,
        msgSchema: messagesSchema,
        allBannersData: {
          ...state.allBannersData,
          isValidForm: true,
          msgSchema: messagesSchemaBanner
        }
      };

    case UPDATE_FULL_FORM_BANNER:
      return {
        ...state,
        isValidForm: true,
        msgSchema: messagesSchema,
        allBannersData: {
          ...state.allBannersData,
          editBannerForm: payload,
          isValidForm: true,
          msgSchema: messagesSchemaBanner
        }
      };

    case PUSH_BANNER_ID:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          bannersArray: [...state.allBannersData.bannersArray, payload]
        }
      };

    case UPDATE_FULL_BANNERS:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          bannersArray: payload
        }
      };

    case UPDATE_IS_EDIT_BANNER_FLAG:
      return {
        ...state,
        allBannersData: {
          ...state.allBannersData,
          isEditingBanner: payload
        }
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
    bannerFormEditMode: data => bannerFormEditMode(data),
    onChangeForm: obj => onChangeForm(obj, 'banner'),
    onSaveBanner: formData => onSaveBanner(formData),
    onClearForm: () => onClearForm('banner')
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
  function bannerFormEditMode(bannerID) {
    dispatch({ type: UPDATE_IS_EDIT_BANNER_FLAG, payload: bannerID });
  }
  function onChangeForm(obj, formType) {
    //   console.log('onChangeForm: ', obj);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: formType === 'banner' ? UPDATE_FORM_BANNER : UPDATE_FORM,
      payload: obj
    });
  }
  function onDeleteBanner(someID) {
    const { bannersArray } = state.allBannersData;
    const bannerIndex = searchObjectByProp(bannersArray, 'bannerID', someID);
    const newBanners = arrayWithoutIndex(bannersArray, bannerIndex);
    dispatch({ type: UPDATE_FULL_BANNERS, payload: newBanners });
  }
  function onEditBanner(someBanner) {
    const { bannerID } = someBanner;
    const { bannersArray } = state.allBannersData;
    const bannerIndex = searchObjectByProp(bannersArray, 'bannerID', bannerID);
    const newBanners = arrayElementSustitution(
      bannersArray,
      bannerIndex,
      someBanner
    );
    dispatch({ type: UPDATE_FULL_BANNERS, payload: newBanners });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      console.log('onSubmit: Success\n', formData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function onSaveBanner(newBannerData) {
    const { isValid } = validateBannerForm(newBannerData.banner);
    if (isValid) {
      console.log('onSaveBanner: Success\n', newBannerData);
      onEditBanner(newBannerData);
      bannerFormEditMode(false);
    } else {
      console.log('onSaveBanner: Error\n', newBannerData);
    }
  }
  function onClearForm(formType) {
    const dispatchType = formType === 'banner' ? RESET_FORM_BANNER : RESET_FORM;
    console.log('onClearForm: ', dispatchType);
    dispatch({ type: dispatchType });
    setReRender(true);
  }
  function createNewBanner() {
    const { length } = state.allBannersData.bannersArray;
    const bannerID = `${length}${genRandomString(4)}`;
    const banner = {
      imgDesk: 'https://www.shbfinancialservices.com/images/nodatafound.png',
      imgMovil: 'https://i.imgur.com/FPC6uwX.png',
      visible: true
    };
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: PUSH_BANNER_ID,
      payload: { bannerID, banner }
    });
    setReRender(true);
    bannerFormEditMode(bannerID);
    setReRender(true);
  }
  function getHomeData() {
    asyncHandler(getHomeReq, onSuccessGetHome, onError);
  }
  // ----------------------- Metodos Auxiliares
  function onSuccessGetHome(data) {
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
  function validateBannerForm(formData) {
    const validation = joiFormValidateBanner(formData);
    dispatch({
      type: UPDATE_MSGSCHEMA_BANNER,
      payload: validation
    });
    return validation;
  }
  function fitDataToForm(data) {
    buildBannerData(data);
    buildProductsData(data);
    buildOtherFormData(data);
  }
  function buildProductsData(data) {
    const { products } = data;
    let productsObj = {};
    products.forEach((product, index) => {
      productsObj = {
        ...productsObj,
        [`porductID${index}`]: product.porductID
      };
    });
    dispatch({
      type: UPDATE_FORM,
      payload: productsObj
    });
  }
  function buildBannerData(data) {
    const { banners } = data;
    const newBannerArray = banners.map((banner, index) => {
      const bannerID = `${index}${genRandomString(4)}`;
      return { banner, bannerID };
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
          defaultValues={state.homeForm}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          allBannersMethods={allBannersMethods}
          formInstance={formInstance}
          allBannersData={state.allBannersData}
          bannerFormMethods={bannerFormMethods}
        />
      </div>
    </StoreMenuCont>
  );
}
export default ClientHomeAdmin;
