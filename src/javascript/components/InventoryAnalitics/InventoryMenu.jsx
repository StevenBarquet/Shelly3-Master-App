// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';

function InventoryMenu(props) {
  const { callBack } = props;
  return (
    <>
      <Row gutter={[20, 0]}>
        <Col className="center-block" xs={24} sm={24} lg={24}>
          <ButtonMlg
            variant="yellow"
            size="big"
            htmlType="button"
            onClick={callBack}
            widthB="60%"
            label="Analizar inventario"
            icon={<DotChartOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default InventoryMenu;
