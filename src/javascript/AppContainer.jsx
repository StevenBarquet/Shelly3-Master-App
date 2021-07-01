// ---Dependencys
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ---Pages Master
import HomePageMaster from 'Pages/HomePageMaster';
import ProductsInfoPage from 'Pages/ProductsInfoPage';
import AdminProductsPage from 'Pages/AdminProductsPage';
import AddProductsPage from 'Pages/AddProductsPage';
import AdminPublicHome from 'Pages/AdminPublicHomePage';
import ToHomeMaster from 'Pages/ToHomeMasterPage';
import MasterLogin from 'Pages/MasterLoginPage';
import MasterLogout from 'Pages/MasterLogoutPage';
import StoreCart from 'Pages/StoreCartPage';
import AdminOrders from 'Pages/AdminOrdersPage';
import EditOrders from 'Pages/EditOrdersPage';
import UtilityDay from 'Pages/UtilityDayPage';
import UtilityWeek from 'Pages/UtilityWeekPage';
import UtilityMonth from 'Pages/UtilityMonthPage';
import UtilityYear from 'Pages/UtilityYearPage';
import AdminUsers from 'Pages/AdminUsersPage';
import CreateUsers from 'Pages/CreateUsersPage';
import EditUsers from 'Pages/EditUsersPage';

// ---Pages Others
import Error404Page from 'Pages/Error404Page';
// ---Components
import NavbarCont from 'Cont/NavbarCont';
import Footer from 'Comp/Footer';

function AppContainer() {
  return (
    <BrowserRouter>
      <NavbarCont />
      <Switch>
        {/* Utility */}
        <Route exact path="/master/utilidadDia" component={UtilityDay} />
        <Route exact path="/master/utilidadSemana" component={UtilityWeek} />
        <Route exact path="/master/utilidadMes" component={UtilityMonth} />
        <Route exact path="/master/utilidadYear" component={UtilityYear} />
        {/* Products */}
        <Route exact path="/master" component={ToHomeMaster} />
        <Route exact path="/master/tienda" component={HomePageMaster} />
        <Route
          exact
          path="/master/adminProductos"
          component={AdminProductsPage}
        />
        <Route
          exact
          path="/master/addProductos([?0-9a-zA-Z]*)"
          component={AddProductsPage}
        />
        <Route
          exact
          path="/master/productInfo([?0-9a-zA-Z]*)"
          component={ProductsInfoPage}
        />
        {/* Orders */}
        <Route exact path="/master/storeCart" component={StoreCart} />
        <Route exact path="/master/adminOrders" component={AdminOrders} />
        <Route
          exact
          path="/master/editOrder([?0-9a-zA-Z]*)"
          component={EditOrders}
        />
        {/* Users */}
        <Route exact path="/master/adminUsers" component={AdminUsers} />
        <Route exact path="/master/editProfile" component={EditUsers} />
        <Route
          exact
          path="/master/createUser([?0-9a-zA-Z]*)"
          component={CreateUsers}
        />
        {/* Others */}
        <Route exact path="/master/publicHome" component={AdminPublicHome} />
        <Route exact path="/master/login" component={MasterLogin} />
        <Route exact path="/master/salir" component={MasterLogout} />
        {/* --------- Client routes --------- */}
        <Route exact path="*" component={Error404Page} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default AppContainer;
