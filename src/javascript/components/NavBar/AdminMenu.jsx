// ---Dependencys
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminMenu(props) {
  const { isMovil, logo, currentPath } = props;
  const [menuVisible, setMenuVisible] = useState(false);

  function changeMenuVisibility() {
    setMenuVisible(!menuVisible);
  }
  if (isMovil)
    return (
      <Row className="nav-div">
        <Col xs={24} sm={24} lg={8}>
          <Link to="/">
            <div className="to-home">
              <img src={logo} alt="Shelly" width="100%" />
            </div>
          </Link>
        </Col>
        <Col xs={24} sm={24} lg={16}>
          <Row>
            <Col xs={24} sm={24} lg={5}>
              <div
                className="nav-btn"
                onClick={changeMenuVisibility}
                role="button"
                tabIndex="0"
              >
                {menuVisible ? <MenuFoldOutlined /> : <MenuOutlined />}
              </div>
            </Col>
            {menuVisible ? <JustButtons currentPath={currentPath} /> : null}
          </Row>
        </Col>
      </Row>
    );
  return (
    <Row className="nav-div">
      <Col xs={24} sm={24} lg={8}>
        <Link to="/">
          <div className="to-home">
            <img src={logo} alt="Shelly" width="100%" />
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={24} lg={16}>
        <Row>
          <JustButtons currentPath={currentPath} />
        </Row>
      </Col>
    </Row>
  );
}

function JustButtons(props) {
  const { currentPath } = props;
  const isStore = new RegExp('^[/][m][a][s][t][e][r][/][t][i][e][n][d][a]');
  return (
    <>
      <Col xs={24} sm={24} lg={4}>
        <Link to="/master/tienda">
          <div
            className={
              isStore.test(currentPath) ? 'nav-btn nav-border' : 'nav-btn'
            }
          >
            Mi Tienda
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={24} lg={4}>
        <Link to="/master/cuenta">
          <div
            className={
              currentPath === '/master/cuenta'
                ? 'nav-btn nav-border'
                : 'nav-btn'
            }
          >
            Mi cuenta
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={24} lg={4}>
        <Link to="/master/salir">
          <div
            className={
              currentPath === '/master/salir' ? 'nav-btn nav-border' : 'nav-btn'
            }
          >
            Salir
          </div>
        </Link>
      </Col>
    </>
  );
}

export default AdminMenu;
