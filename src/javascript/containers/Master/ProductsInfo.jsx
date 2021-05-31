// ---Dependencys
import React, { useEffect } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
import { updateOneProduct } from 'Actions/master';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import DisplayProductInfo from 'Comp/Master/ProductsInfo/DisplayProductInfo';
import SearchPush from 'Comp/Master/ProductsInfo/SearchPush';
// ---Other
import { isId } from 'Others/otherMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getOneProduct } from 'Others/peticiones.js';

// ------------------------------------------ COMPONENT-----------------------------------------
function ProductsInfo() {
  // Redux States
  const { singleProduct } = useSelector(reducers => reducers.masterReducer);
  const { productData } = singleProduct;
  // Redux Actions
  const dispatchR = useDispatch();
  const updateReduxProduct = data => dispatchR(updateOneProduct(data));
  const isLoading = flag => dispatchR(updateLoading(flag));
  // Redux States
  const { currentParams } = useSelector(reducers => reducers.appInfoReducer);
  useEffect(() => getProductData(), [currentParams]);

  function getProductData() {
    const urlID = getID(currentParams);
    if (urlID) {
      isLoading(true);
      asyncHandler(getOneProduct, onSuccessSearch, onError, urlID);
    }
  }

  function onSuccessSearch(data) {
    isLoading(false);
    updateReduxProduct(data);
  }

  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function getID(value) {
    // valida:
    // -Cadena exista y tenga 51 caracteres (27 de url y 24 del id)
    // -Sólo contiene caracteres alfanumericos
    // Retorna:
    // -El id de la url o falso
    if (value && value === '') {
      updateReduxProduct({});
      return false;
    }
    if (value && value.length === 25) {
      const urlID = value.substring(1, value.length);
      return isId(urlID) ? urlID : false;
    }
    return false;
  }
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Información del producto</h1>
      </div>
      <SearchPush pushPath="/master/productInfo" />
      <DisplayProductInfo data={productData} />
    </StoreMenuCont>
  );
}
export default ProductsInfo;
