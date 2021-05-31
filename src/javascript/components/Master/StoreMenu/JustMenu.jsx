// ---Dependencys
import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  DesktopOutlined,
  CodepenOutlined,
  BarcodeOutlined,
  CarryOutOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
// ---Components

const { SubMenu } = Menu;

function JustMenu(props) {
  const { collapsed, toggleCollapsed, goToRoute, currentPath } = props;
  const [reRender, setReRender] = useState(false);

  useEffect(() => setReRender(false), [reRender]);
  useEffect(() => setReRender(true), []);

  const routes = {
    products: [
      '/master/adminProductos',
      '/master/addProductos',
      '/master/productInfo',
      '/master/tienda'
    ],
    orders: ['/master/adminOrders', '/master/editOrder', '/master/storeCart'],
    home: ['/master/publicHome'],
    shipping: ['/master/shippingMethods']
  };

  const keys = {
    [routes.products[0]]: routes.products[3],
    [routes.products[1]]: routes.products[3],
    [routes.products[2]]: routes.products[3],
    [routes.products[3]]: routes.products[3],
    [routes.home[0]]: routes.home[0],
    [routes.shipping[0]]: routes.shipping[0],
    [routes.orders[0]]: '4',
    [routes.orders[1]]: '4',
    [routes.orders[2]]: '4'
  };

  if (!reRender)
    return (
      <div className="store-menu-container">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          //        defaultSelectedKeys={['1']}
          defaultOpenKeys={[keys[currentPath]]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          selectedKeys={[currentPath]}
        >
          <SubMenu key="1" icon={<DollarCircleOutlined />} title="Utilidades">
            <Menu.Item key="sub1-1">Hoy</Menu.Item>
            <Menu.Item key="sub1-2">Semanal</Menu.Item>
            <Menu.Item key="sub1-3">Mensual</Menu.Item>
            <Menu.Item key="sub1-4">Anual</Menu.Item>
            <Menu.Item key="sub1-5">Historico</Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={<DesktopOutlined />}
            key={routes.home[0]}
            onClick={() => goToRoute(routes.home[0])}
          >
            Home publico
          </Menu.Item>
          <Menu.Item
            icon={<CodepenOutlined />}
            key="/master/shippingMethods"
            onClick={() => goToRoute(routes.shipping[0])}
          >
            Metodos de envío
          </Menu.Item>
          <SubMenu
            key="/master/tienda"
            icon={<BarcodeOutlined />}
            title="Productos"
          >
            <Menu.Item
              key={routes.products[0]}
              onClick={() => goToRoute(routes.products[0])}
            >
              Administrar Productos
            </Menu.Item>
            <Menu.Item
              key={routes.products[1]}
              onClick={() => goToRoute(routes.products[1])}
            >
              Agregar/Editar Productos
            </Menu.Item>
            <Menu.Item
              key={routes.products[2]}
              onClick={() => goToRoute(routes.products[2])}
            >
              Consultar un producto
            </Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<CarryOutOutlined />} title="Ordenes">
            <Menu.Item
              key={routes.orders[0]}
              onClick={() => goToRoute(routes.orders[0])}
            >
              Administrar Ordenes
            </Menu.Item>
            <Menu.Item
              key={routes.orders[1]}
              onClick={() => goToRoute(routes.orders[1])}
            >
              Editar Ordenes
            </Menu.Item>
            <Menu.Item
              key={routes.orders[2]}
              onClick={() => goToRoute(routes.orders[2])}
            >
              Vender en mostrador
            </Menu.Item>
            <Menu.Item key="sub4-3">Generar orden</Menu.Item>
            <Menu.Item key="sub4-4">Seguimiento de ordenes</Menu.Item>
          </SubMenu>
          <SubMenu
            key="5"
            icon={<TeamOutlined />}
            title="Cuentas de administracion"
          >
            <SubMenu key="sub5-1" title="Crear cuenta">
              <Menu.Item key="sub5-1-1">Administrador</Menu.Item>
              <Menu.Item key="sub5-1-2">Master</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5-2" title="Administrar cuentas">
              <Menu.Item key="sub5-2-1">Administrador</Menu.Item>
              <Menu.Item key="sub5-2-2">Master</Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item
            icon={<BarChartOutlined />}
            key="/master/Analytics"
            onClick={() => goToRoute('/master/Analytics')}
          >
            Analyticas
          </Menu.Item>
        </Menu>
      </div>
    );
  return null;
}

export default JustMenu;
