// ---Dependencys
import React, { useEffect, useState } from 'react';
import { Row, Col, Select } from 'antd';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
import {
  updateSearchParams,
  updateProducts,
  updatePage,
  changeFirstRender,
  resetSearchParams
} from 'Actions/master';
// ---Components
import ProductTable from 'Comp/Master/StoreCart/ProductTable';
import ProductCard from 'Comp/Master/StoreCart/ProductCard';
import ProductSearcher from 'Comp/Master/AdminProducts/ProductSearcher';
// ---ComonComponents
import mapOptions from 'CommonComps/mapOptions';
// ---Others
import { catalogos } from 'Others/labels.json';
import { removeNullProperties } from 'Others/otherMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { adminSearchProducts } from 'Others/peticiones.js';

// ---AUX COMPONENTS
function ProductsDisplay(props) {
  const {
    firstRender,
    productCount,
    products,
    current,
    pageSize,
    onPageChange,
    onShowCard,
    addToCart
  } = props;
  if (firstRender)
    return (
      <h4>Realiza una busqueda o deja vacío para traer todos los productos</h4>
    );
  if (productCount === 0) return <h4>Sin resultados de busqueda</h4>;
  return (
    <ProductTable
      products={products}
      current={current}
      pageSize={pageSize}
      total={productCount}
      onPageChange={onPageChange}
      onShowCard={onShowCard}
      addToCart={addToCart}
    />
  );
}
function ResponsableSelect(props) {
  const { options, handleResponsable, responsableVenta } = props;
  return (
    <div style={{ marginTop: 30 }} className="store-content-container">
      <Row>
        <Col xs={24} sm={24} lg={10}>
          <span className="label">Responsable:</span>
        </Col>
        <Col xs={24} sm={24} lg={14}>
          <Select
            style={{ width: '100%' }}
            value={responsableVenta}
            onChange={handleResponsable}
          >
            {mapOptions(options)}
          </Select>
        </Col>
      </Row>
    </div>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function SearchCont(props) {
  const { addToCart, handleResponsable, responsableVenta } = props;
  const initialState = {
    showCard: false,
    productData: {}
  };
  const [state, setState] = useState(initialState);
  // Redux States
  const { masterProducts } = useSelector(reducers => reducers.masterReducer);
  const {
    productCount,
    products,
    updatedData,
    searchParams,
    firstRender
  } = masterProducts;
  // Redux Actions
  const dispatchR = useDispatch();
  const updateSearchData = data => dispatchR(updateSearchParams(data));
  const updateReduxProducts = data => dispatchR(updateProducts(data));
  const updateReduxPage = page => dispatchR(updatePage(page));
  const isLoading = flag => dispatchR(updateLoading(flag));
  const setFirstRender = flag => dispatchR(changeFirstRender(flag));
  const clearFilters = () => dispatchR(resetSearchParams());

  useEffect(() => reloadData(), [updatedData]);

  // ----------------------- Metodos Principales
  function submitData(data) {
    isLoading(true);
    updateSearchData(data);
    const cleanedData = cleanSearchData(searchParams, data);
    asyncHandler(adminSearchProducts, onSuccessSearch, testError, cleanedData);
  }

  function onPageChange(newPage, newSize) {
    isLoading(true);
    updateReduxPage({ newPage, newSize });
    const changedPage = newSize
      ? { ...searchParams, pageNumber: newPage, pageSize: newSize }
      : { ...searchParams, pageNumber: newPage };
    const cleanedData = cleanSearchData(changedPage, searchParams);
    asyncHandler(adminSearchProducts, onSuccessSearch, onError, cleanedData);
  }

  function reloadData() {
    if (!updatedData && !firstRender) {
      console.log('Is reloading...');
      isLoading(true);
      const cleanedData = cleanSearchData(searchParams, searchParams);
      asyncHandler(adminSearchProducts, onSuccessSearch, onError, cleanedData);
    }
  }

  function onShowCard(data) {
    setState({
      ...state,
      showCard: true,
      productData: data
    });
  }

  function onHideCard() {
    setState({
      ...state,
      showCard: false
    });
  }
  // ----------------------- Metodos Auxiliares
  function onSuccessSearch(data) {
    isLoading(false);
    setFirstRender(false);
    updateReduxProducts(data);
  }

  function onError(err) {
    testError(err);
    isLoading(false);
  }

  function cleanSearchData(searchData, formData) {
    const { filters, searchedValue, sortBy } = formData;
    const fullData = {
      ...searchData,
      searchedValue: searchedValue === '' ? null : searchedValue,
      sortBy,
      filters: { ...filters } // Trick to not mutate searchData
    };

    return {
      ...removeNullProperties(fullData),
      sortBy: JSON.parse(fullData.sortBy)
    };
  }

  return (
    <Row>
      <Col xs={24} sm={24} lg={6}>
        <ResponsableSelect
          options={catalogos.responsables}
          handleResponsable={handleResponsable}
          responsableVenta={responsableVenta}
        />
      </Col>
      <Col xs={24} sm={24} lg={18}>
        <ProductSearcher
          clearFilters={clearFilters}
          submitData={submitData}
          defaultValues={searchParams}
        />
      </Col>
      <div className="store-content-container">
        <ProductsDisplay
          firstRender={firstRender}
          productCount={productCount}
          products={products}
          current={searchParams.pageNumber}
          pageSize={searchParams.pageSize}
          onPageChange={onPageChange}
          onShowCard={onShowCard}
          addToCart={addToCart}
        />
      </div>
      {state.showCard && (
        <ProductCard onHideCard={onHideCard} data={state.productData} />
      )}
    </Row>
  );
}

export default SearchCont;
