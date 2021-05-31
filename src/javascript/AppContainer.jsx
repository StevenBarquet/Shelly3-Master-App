// ---Dependencys
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ---Pages Master
import HomePageMaster from 'Pages/Master/HomePageMaster';
import ProductsInfoPage from 'Pages/Master/ProductsInfoPage';
import AdminProductsPage from 'Pages/Master/AdminProductsPage';
import AddProductsPage from 'Pages/Master/AddProductsPage';
import AdminPublicHome from 'Pages/Master/AdminPublicHomePage';
import ToHomeMaster from 'Pages/Master/ToHomeMasterPage';
import MasterLogin from 'Pages/Master/MasterLoginPage';
import MasterLogout from 'Pages/Master/MasterLogoutPage';
import StoreCart from 'Pages/Master/StoreCartPage';
import AdminOrders from 'Pages/Master/AdminOrdersPage';
import EditOrders from 'Pages/Master/EditOrdersPage';
// ---Pages Client
import HomePage from 'Pages/Client/HomePage';
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
        {/* --------- Master routes --------- */}
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
        {/* Others */}
        <Route exact path="/master/publicHome" component={AdminPublicHome} />
        <Route exact path="/master/login" component={MasterLogin} />
        <Route exact path="/master/salir" component={MasterLogout} />
        {/* --------- Client routes --------- */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="*" component={Error404Page} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default AppContainer;
