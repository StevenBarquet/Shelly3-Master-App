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
// ---Others
import { appData } from 'Others/store-data.json';

const { SubMenu } = Menu;
const { menuRoutes } = appData;

function buildKeys() {
  let keys = {};
  menuRoutes.forEach(roteData => {
    const { route, parentKey } = roteData;
    keys = {
      ...keys,
      [route]: parentKey
    };
  });
  return keys;
}

function JustMenu(props) {
  const { collapsed, toggleCollapsed, goToRoute, currentPath } = props;
  const [reRender, setReRender] = useState(false);

  useEffect(() => setReRender(false), [reRender]);
  useEffect(() => setReRender(true), []);

  const keys = buildKeys();

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
          <SubMenu
            key="utilityMenu"
            icon={<DollarCircleOutlined />}
            title="Utilidades"
          >
            <Menu.Item
              key="/master/inventoryAnalitics"
              onClick={() => goToRoute('/master/inventoryAnalitics')}
            >
              Analiticas de inventario
            </Menu.Item>
            <Menu.Item
              key="/master/utilidadDia"
              onClick={() => goToRoute('/master/utilidadDia')}
            >
              Hoy
            </Menu.Item>
            <Menu.Item
              key="/master/utilidadSemana"
              onClick={() => goToRoute('/master/utilidadSemana')}
            >
              Semanal
            </Menu.Item>
            <Menu.Item
              key="/master/utilidadMes"
              onClick={() => goToRoute('/master/utilidadMes')}
            >
              Mensual
            </Menu.Item>
            <Menu.Item
              key="/master/utilidadYear"
              onClick={() => goToRoute('/master/utilidadYear')}
            >
              Anual
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="generalPublicMenu"
            icon={<DesktopOutlined />}
            title="Publico General"
          >
            <Menu.Item
              key="/master/clientHome"
              onClick={() => goToRoute('/master/clientHome')}
            >
              Pagina de inicio
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={<CodepenOutlined />}
            key="/master/shippingMethods"
            onClick={() => goToRoute('/master/shippingMethods')}
          >
            Metodos de envío
          </Menu.Item>
          <SubMenu
            key="/master/tienda"
            icon={<BarcodeOutlined />}
            title="Productos"
          >
            <Menu.Item
              key="/master/adminProductos"
              onClick={() => goToRoute('/master/adminProductos')}
            >
              Administrar Productos
            </Menu.Item>
            <Menu.Item
              key="/master/addProductos"
              onClick={() => goToRoute('/master/addProductos')}
            >
              Agregar/Editar Productos
            </Menu.Item>
            <Menu.Item
              key="/master/productInfo"
              onClick={() => goToRoute('/master/productInfo')}
            >
              Consultar un producto
            </Menu.Item>
          </SubMenu>
          <SubMenu key="orderMenu" icon={<CarryOutOutlined />} title="Ordenes">
            <Menu.Item
              key="/master/adminOrders"
              onClick={() => goToRoute('/master/adminOrders')}
            >
              Administrar Ordenes
            </Menu.Item>
            <Menu.Item
              key="/master/editOrder"
              onClick={() => goToRoute('/master/editOrder')}
            >
              Editar Ordenes
            </Menu.Item>
            <Menu.Item
              key="/master/storeCart"
              onClick={() => goToRoute('/master/storeCart')}
            >
              Vender en mostrador
            </Menu.Item>
            <Menu.Item
              key="/master/genOrder"
              onClick={() => goToRoute('/master/genOrder')}
            >
              Generar orden
            </Menu.Item>
            <Menu.Item
              key="/master/followUpOrder"
              onClick={() => goToRoute('/master/followUpOrder')}
            >
              Seguimiento de ordenes
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="usersMenu"
            icon={<TeamOutlined />}
            title="Administración de cuentas"
          >
            <Menu.Item
              key="/master/editProfile"
              onClick={() => goToRoute('/master/editProfile')}
            >
              Editar mi perfil
            </Menu.Item>
            <Menu.Item
              key="/master/adminUsers"
              onClick={() => goToRoute('/master/adminUsers')}
            >
              Administrar cuentas
            </Menu.Item>
            <Menu.Item
              key="/master/createUser"
              onClick={() => goToRoute('/master/createUser')}
            >
              Crear/Editar cuentas
            </Menu.Item>
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
