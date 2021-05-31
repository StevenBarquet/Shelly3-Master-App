/* eslint-disable prefer-promise-reject-errors */
// ---Dependencys
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';
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
import { productos } from 'Others/store-data.json';

// ---AUX COMPONENTS
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
function ProductSearcher(props) {
  // ----------------------- hooks, const, props y states
  const { defaultValues, submitData, clearFilters } = props;
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const filterOption = [
    {
      label: 'Ambos',
      value: null
    },
    {
      label: 'Si',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ];

  // ----------------------- Metodos Principales
  const changeAdvance = () => setAdvanceSearch(!advanceSearch);
  const [render, setRender] = useState(true);
  useEffect(() => setRender(true), [render]);

  function onFinish(data) {
    setAdvanceSearch(false);
    submitData(data);
  }
  function onClearFilters() {
    clearFilters();
    setRender(false);
  }
  // ----------------------- Metodos Auxiliares
  function validate(rule, value) {
    // Valida:
    // -Si la cadena no está vacía que tenga entre 3 y 25 de longitud
    if (!value || (value.length > 2 && value.length < 26)) {
      return Promise.resolve();
    }
    return Promise.reject('Ingresa una palabra entre 3 y 25 caracteres');
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
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 17 }}
                name="searchedValue"
                label="Palabra clave"
                rules={[
                  {
                    required: false,
                    message: 'Máximo 50 caracteres'
                  },
                  { validator: validate }
                ]}
              >
                <Input />
              </Form.Item>
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
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'online']}
                  label="Venta Online"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 11, offset: 1 }}
                sm={{ span: 11, offset: 1 }}
                lg={7}
              >
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'nuevo']}
                  label="Producto Nuevo"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col xs={11} sm={11} lg={7}>
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'descuento']}
                  label="Descuento"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={18}>
                <Form.Item
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  name={['filters', 'categoria']}
                  label="Categoria"
                >
                  <Select>{mapOptions(productos.categoriasFiltro)}</Select>
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
                        <Radio value={'{ "nombre": 1 }'}>
                          <h5>
                            Nombre <span>A-Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "nombre": -1 }'}>
                          <h5>
                            Nombre <span>Z-A</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "marca": 1 }'}>
                          <h5>
                            Marca <span>A-Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "marca": -1 }'}>
                          <h5>
                            Marca <span>Z-A</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "precioOnline": -1 }'}>
                          <h5>
                            Precio <span>- +</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "precioOnline": 1 }'}>
                          <h5>
                            Precio <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>

                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countVisits": 1 }'}>
                          <h5>
                            Visitas <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countVisits": -1 }'}>
                          <h5>
                            Visitas <span>- +</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countQuestions": 1 }'}>
                          <h5>
                            Preguntas <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countQuestions": -1 }'}>
                          <h5>
                            Preguntas <span>- +</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countPurchases": 1 }'}>
                          <h5>
                            Ventas <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={'{ "countPurchases": -1 }'}>
                          <h5>
                            Ventas <span>- +</span>
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
export default ProductSearcher;
