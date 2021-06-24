// ---Dependencys
import React from 'react';
import { Col } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
// ---Redux
import { useSelector } from 'react-redux';
// ---Components
import StoreMenuCont from 'Cont/StoreMenuCont';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { checkRoute } from 'Others/peticiones.js';

// Permite buscar, redirigir a editar, agregar a home, ver ficha con background close button
// ------------------------------------------ COMPONENT-----------------------------------------
function AdminPublicHome() {
  // Redux States
  const { currentPath } = useSelector(reducers => reducers.appInfoReducer);

  function someReq() {
    const reqData = { route: currentPath };
    asyncHandler(checkRoute, onSuccessLogIn, onErrorLogIn, reqData);
  }

  function onSuccessLogIn(data) {
    console.log('onSuccessLogIn: ', data);
  }

  function onErrorLogIn(data) {
    testError(data);
  }
  return (
    <StoreMenuCont>
      <div className="store-welcom-container">
        <h1>Administrador de Home</h1>
      </div>
      <div className="store-welcom-container">
        <Col xs={24} sm={24} lg={6}>
          <ButtonMlg
            variant="blue-outline"
            size="small"
            htmlType="button"
            onClick={someReq}
            widthB="85%"
            label="Test Req"
            icon={<ClearOutlined />}
          />
        </Col>
      </div>
    </StoreMenuCont>
  );
}
export default AdminPublicHome;
