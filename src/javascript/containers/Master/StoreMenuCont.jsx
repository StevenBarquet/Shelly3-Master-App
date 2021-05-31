// ---Dependencys
import React, { useState, useEffect } from 'react';
import { Row, Col, Affix } from 'antd';
import { useHistory } from 'react-router-dom';
// ---Redux
import { useSelector } from 'react-redux';
// ---Components
import AuthValidate from 'Cont/Master/AuthValidate';
import JustMenu from 'Comp/Master/StoreMenu/JustMenu';

// ------------------------------------------ COMPONENT-----------------------------------------
function StoreMenuCont(props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const history = useHistory();
  // Redux States
  const { currentPath, isMovil } = useSelector(
    reducers => reducers.appInfoReducer
  );

  useEffect(() => closeMenuAfterLoad(), []);

  function closeMenuAfterLoad() {
    const timer = setTimeout(() => setCollapsed(true), 800);
    return () => clearTimeout(timer);
  }

  function goToRoute(route) {
    history.push(route);
    setCollapsed(true);
  }
  // ----------------------- Render
  if (isMovil)
    return (
      <AuthValidate>
        <Row>
          <Col xs={24} sm={24} lg={!collapsed ? 9 : 3}>
            <JustMenu
              goToRoute={goToRoute}
              toggleCollapsed={toggleCollapsed}
              collapsed={collapsed}
              currentPath={currentPath}
            />
          </Col>
          <Col xs={24} sm={24} lg={!collapsed ? 14 : 21}>
            {children}
          </Col>
        </Row>
      </AuthValidate>
    );
  return (
    <AuthValidate>
      <Row>
        <Col xs={24} sm={24} lg={!collapsed ? 9 : 3}>
          <Affix offsetTop={0}>
            <JustMenu
              goToRoute={goToRoute}
              toggleCollapsed={toggleCollapsed}
              collapsed={collapsed}
              currentPath={currentPath}
            />
          </Affix>
        </Col>
        <Col xs={24} sm={24} lg={!collapsed ? 14 : 21}>
          {children}
        </Col>
      </Row>
    </AuthValidate>
  );
}
export default StoreMenuCont;
