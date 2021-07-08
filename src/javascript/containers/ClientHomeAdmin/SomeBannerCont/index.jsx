// ---Dependencys
import React, { useReducer, useEffect, useState } from 'react';
// ---Components
import SomeBannerForm from 'Comp/ClientHomeAdmin/AllBanners/SomeBannerForm';
// ---Others
import { joiFormValidate, messagesSchema } from './SomeBannerContSchema';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  RESET_FORM: 'RESET_FORM',
  UPDATE_BANNER_ID: 'UPDATE_BANNER_ID'
};

const {
  RESET_VALIDATIONS,
  UPDATE_FORM,
  UPDATE_MSGSCHEMA,
  RESET_FORM,
  UPDATE_BANNER_ID
} = typesR;

const initialState = {
  msgSchema: messagesSchema,
  form: {},
  isValidForm: true,
  bannerId: ''
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

    case UPDATE_BANNER_ID:
      return {
        ...state,
        bannerId: payload
      };

    case UPDATE_FORM:
      return { ...state, form: { ...state.form, ...payload } };

    default:
      return state;
  }
}
// ------------------------------------------ CONTAINER-----------------------------------------
function SomeBannerCont(props) {
  // ----------------------- hooks, const, props y states
  const { bannerData, allBannersData, bannerFormMethods } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reRender, setReRender] = useState(false);
  useEffect(() => setReRender(false));
  useEffect(() => onUpdateBannerData(), [bannerData]);
  useEffect(() => listenMegaSubmit(), [allBannersData.doMegaSubmit]);
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
      const { bannerID } = bannerData;
      const newBannerData = { bannerID, banner: state.form, doUpdate: true };
      bannerFormMethods.onMegaSubmit(newBannerData);
    } else {
      console.log('onSubmit SomeBannerCont: Error\n', formData);
    }
  }
  function onClearForm() {
    dispatch({ type: RESET_FORM });
    setReRender(true);
  }
  function onUpdateBannerData() {
    const { bannerID, banner } = bannerData;
    dispatch({ type: UPDATE_BANNER_ID, payload: bannerID });
    dispatch({ type: UPDATE_FORM, payload: banner });
    setReRender(true);
  }
  function listenMegaSubmit() {
    const { doMegaSubmit } = allBannersData;
    if (doMegaSubmit) {
      const { bannerID } = bannerData;
      const submitButton = document.getElementById(`button${bannerID}`);
      submitButton.click();
    }
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
    <>
      {!reRender && (
        <SomeBannerForm
          bannerId={bannerData.bannerID}
          onChangeForm={onChangeForm}
          defaultValues={state.form}
          onSubmit={onSubmit}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          onClearForm={onClearForm}
          onDeleteBanner={bannerFormMethods.onDeleteBanner}
        />
      )}
    </>
  );
}

export default SomeBannerCont;
