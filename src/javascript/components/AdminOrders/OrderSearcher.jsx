/* eslint-disable prefer-promise-reject-errors */
// ---Dependencys
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Radio, DatePicker } from 'antd';
import {
  LoginOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  ClearOutlined
} from '@ant-design/icons';
// ---CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
import mapOptions from 'CommonComps/mapOptions';
// ---Other
import { catalogos } from 'Others/labels.json';
import { validate } from './OrderSearcherJoi';

// ---AUX COMPONENTS
function FiltersSelect(props) {
  const { options, name, label } = props;
  return (
    <Form.Item
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      name={['filters', name]}
      label={label}
    >
      <Select>{mapOptions(options)}</Select>
    </Form.Item>
  );
}
function InputValidated(props) {
  const { name, label } = props;
  return (
    <Form.Item
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      name={name}
      label={label}
      rules={[
        {
          required: false
        },
        { validator: validate[name] }
      ]}
    >
      <Input />
    </Form.Item>
  );
}
function SubmitButton(props) {
  const { advanceSearch } = props;
  if (!advanceSearch)
    return (
      <Col className="col-vertical-align" xl={4}>
        <ButtonMlg
          variant="yellow"
          size="small"
          htmlType="submit"
          widthB="85%"
          label="Buscar"
          icon={<LoginOutlined />}
        />
      </Col>
    );
  return null;
}
function SubmitButton2() {
  return (
    <Col className="col-vertical-align" xl={24}>
      <ButtonMlg
        variant="yellow"
        size="small"
        htmlType="submit"
        widthB="85%"
        label="Buscar"
        icon={<LoginOutlined />}
      />
    </Col>
  );
}

function FilterButton(props) {
  const { advanceSearch, changeAdvance } = props;
  return (
    <Col className="col-vertical-align" xl={3}>
      <ButtonMlg
        variant="purple"
        size="small"
        htmlType="button"
        widthB="85%"
        label="Filtros"
        onClick={changeAdvance}
        icon={
          advanceSearch ? (
            <VerticalAlignTopOutlined />
          ) : (
            <VerticalAlignBottomOutlined />
          )
        }
      />
    </Col>
  );
}
function ClearFiltersButton(props) {
  const { advanceSearch, clearFilters } = props;
  if (advanceSearch)
    return (
      <Col className="col-vertical-align" xl={4}>
        <ButtonMlg
          variant="yellow-outline"
          size="small"
          htmlType="button"
          widthB="85%"
          label="Limpiar Filtros"
          onClick={clearFilters}
          icon={<ClearOutlined />}
        />
      </Col>
    );
  return null;
}
// ------------------------------------------ COMPONENT-----------------------------------------
function OrderSearcher(props) {
  // ----------------------- hooks, const, props y states
  const { defaultValues, onFinishForm, clearFilters } = props;
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => setRender(true), [render]); // Trick to reload filters

  // ----------------------- Metodos Principales
  const changeAdvance = () => setAdvanceSearch(!advanceSearch);
  function onClearFilters() {
    clearFilters();
    setRender(false);
  }
  function onFinish(data) {
    onFinishForm(data);
    setRender(false);
    setAdvanceSearch(false);
  }
  // ----------------------- Render
  if (render)
    return (
      <div className="store-content-container">
        {/* ----------------------------form------------------------- */}
        <Form
          style={{ width: '100%' }}
          initialValues={defaultValues || null}
          onFinish={onFinish}
        >
          <Row>
            <Col style={{ marginTop: '20px' }} xl={17}>
              <InputValidated name="searchedValue" label="Palabra clave" />
            </Col>
            <SubmitButton advanceSearch={advanceSearch} />
            <ClearFiltersButton
              clearFilters={onClearFilters}
              advanceSearch={advanceSearch}
            />
            <FilterButton
              advanceSearch={advanceSearch}
              changeAdvance={changeAdvance}
            />
            {/* -------------------Advanced options---------------- */}
            {/* ---Use display none to keep the form values on false advanceSearch */}
            <Row style={advanceSearch ? null : { display: 'none' }}>
              {/* --Filtros-- */}
              <Col offset={1} xs={22} sm={22} lg={20}>
                <h2>Filtrar por:</h2>
              </Col>
              <Col xs={11} sm={11} lg={7}>
                <FiltersSelect
                  name="ventaTipo"
                  label="Tipo de venta"
                  options={catalogos.ventaTipoFiltro}
                />
              </Col>
              <Col
                xs={{ span: 11, offset: 1 }}
                sm={{ span: 11, offset: 1 }}
                lg={7}
              >
                <FiltersSelect
                  name="metodoPago"
                  label="Método de pago"
                  options={catalogos.metodoPagoFiltro}
                />
              </Col>
              <Col xs={11} sm={11} lg={7}>
                <FiltersSelect
                  name="estatus"
                  label="Estatus"
                  options={catalogos.estatusFiltro}
                />
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 10 }}
                  name={['filters', 'startDate']}
                  label="Fecha inicial"
                >
                  <DatePicker format="YYYY/MM/DD" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 10 }}
                  name={['filters', 'finalDate']}
                  label="Fecha final"
                >
                  <DatePicker format="YYYY/MM/DD" />
                </Form.Item>
              </Col>
              {/* --Sort-- */}
              <Col offset={1} xs={22} sm={22} lg={20}>
                <h2>Ordenar por:</h2>
              </Col>
              <Col className="col-vertical-align" xs={24} sm={24} lg={24}>
                <Form.Item name="sortBy">
                  <Radio.Group>
                    <Row style={{ marginTop: 25 }}>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "date": -1 }'}>
                          <h5>
                            Fecha <span>Reciente-Antigua</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "date": 1 }'}>
                          <h5>
                            Fecha <span>Antigua-Reciente</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "totalVenta": 1 }'}>
                          <h5>
                            Venta <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "totalVenta": -1 }'}>
                          <h5>
                            Venta <span>- +</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "responsableVenta": 1 }'}>
                          <h5>
                            Responsable <span>A - Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "responsableVenta": -1 }'}>
                          <h5>
                            Responsable <span>Z - A</span>
                          </h5>
                        </Radio>
                      </Col>

                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "estatus": 1 }'}>
                          <h5>
                            Estatus <span>A - Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "estatus": -1 }'}>
                          <h5>
                            Estatus <span>Z - A</span>
                          </h5>
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <SubmitButton2 />
            </Row>
          </Row>
        </Form>
      </div>
    );
  return null;
}
export default OrderSearcher;
