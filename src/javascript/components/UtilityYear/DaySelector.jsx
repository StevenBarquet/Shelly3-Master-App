// ---Dependencys
import React from 'react';
import { Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/AuthValidate';
// ------------------------------------------ COMPONENT-----------------------------------------
function DaySelector(props) {
  const { onDateChange, onSearch, disabled } = props;
  // ----------------------- Metodos Principales
  // ----------------------- Metodos Auxiliares
  return (
    <div className="store-content-container">
      <Row>
        <Col xs={24} sm={24} lg={8}>
          <h4 style={{ textAlign: 'end' }}>Porfavor selecciona año:</h4>
        </Col>
        <Col xs={24} sm={24} lg={10}>
          <DatePicker
            style={{ margin: '15px 10px 0px 10px' }}
            onChange={onDateChange}
            placeholder="Selecciona año"
            picker="year"
          />
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <ButtonMlg
            variant={disabled ? 'block' : 'yellow'}
            size="small"
            htmlType="button"
            onClick={onSearch}
            widthB="85%"
            label="Buscar"
            icon={<SearchOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DaySelector;
