// ---Dependencys
import React, { useReducer } from 'react';
import { Form, Row, Col, Input, Select, Switch } from 'antd';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
import mapOptions from 'CommonComps/mapOptions';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';
// ---Others
import { joiFormValidate, messagesSchema } from './SimpleControlledFormSchema';

// --------------------------------------- FORM COMPONENT --------------------------------------
function SomeForm(props) {
  const {
    defaultValues,
    onChangeForm,
    onSubmit,
    validation,
    isValidForm
  } = props;
  const { name, gender, online } = validation;
  const genderOptions = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    },
    {
      label: 'Unknown',
      value: 'unknown'
    }
  ];

  return (
    <>
      <Form
        initialValues={defaultValues}
        onValuesChange={onChangeForm}
        onFinish={onSubmit}
      >
        <Row gutter={[20, 10]}>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Nombre"
              name="name"
              validateStatus={name.status}
              help={name.status === 'error' ? name.message : null}
              rules={[{ required: false, message: name.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="Género"
              name="gender"
              validateStatus={gender.status}
              help={gender.status === 'error' ? gender.message : null}
              rules={[{ required: false, message: gender.message }]}
            >
              <Select>{mapOptions(genderOptions)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              label="online"
              name="online"
              validateStatus={online.status}
              help={online.status === 'error' ? online.message : null}
              rules={[{ required: false, message: online.message }]}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          {/* Finish Form */}
          <Col className="col-vertical-align" xs={24} sm={24} lg={24}>
            <ButtonMlg
              variant="purple"
              size="small"
              htmlType="submit"
              widthB="85%"
              label="Submit"
            />
          </Col>
          {!isValidForm && (
            <Col className="col-vertical-align" xs={24} sm={24} lg={24}>
              <h5>Algunos campos no son válidos, revisa tus datos</h5>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
}

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
// ------------------------------------------ CONTAINER-----------------------------------------
function SimpleControlledForm() {
  // ----------------------- hooks, const, props y states
  const { RESET_VALIDATIONS, UPDATE_FORM, UPDATE_MSGSCHEMA } = typesR;
  const initalState = {
    msgSchema: messagesSchema,
    form: {},
    isValidForm: true
  };
  const [state, dispatch] = useReducer(reducer, initalState);

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
      <SomeForm
        onChangeForm={onChangeForm}
        defaultValues={state.form}
        onSubmit={onSubmit}
        validation={state.msgSchema}
        isValidForm={state.isValidForm}
      />
    </div>
  );
}

export default SimpleControlledForm;
