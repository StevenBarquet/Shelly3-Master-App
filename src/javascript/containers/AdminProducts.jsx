// ---Dependencys
import React, { useEffect } from 'react';
// ---Components
import StoreMenuCont from 'Cont/StoreMenuCont';
import ProductSearcher from 'Comp/AdminProducts/ProductSearcher';
import ProductTable from 'Comp/AdminProducts/ProductTable';
import ModalConfirmation from 'Utils/ModalConfirmation';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
import {
  updateSearchParams,
  updateProducts,
  updatePage,
  setNotUpdated,
  changeFirstRender,
  resetSearchParams
} from 'Actions/master';
// ---Others
import { removeNullProperties } from 'Others/otherMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import {
  adminSearchProducts,
  deleteProductRequest
} from 'Others/peticiones.js';

// ---AUX COMPONENTS
function ProductsDisplay(props) {
  const {
    firstRender,
    productCount,
    products,
    current,
    pageSize,
    onPageChange,
    onDelete
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
      onDelete={onDelete}
    />
  );
}

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminProducts() {
  // ----------------------- hooks, const, props y states
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
  const notUpdated = () => dispatchR(setNotUpdated());
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

  function onDeleteButton(data) {
    const question = '¿Deseas eliminar éste producto?';
    const details = `El producto con id: ${data} será eliminado permanentemente`;
    ModalConfirmation(question, details, onDelete, data);
  }

  // ----------------------- Metodos Auxiliares

  function onDelete(id) {
    isLoading(true);
    asyncHandler(deleteProductRequest, onSuccessDelete, onError, id);
  }
  function onSuccessDelete() {
    notUpdated();
    isLoading(false);
  }

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

  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Productos</h1>
      </div>
      <ProductSearcher
        clearFilters={clearFilters}
        submitData={submitData}
        defaultValues={searchParams}
      />
      <div className="store-content-container">
        <ProductsDisplay
          firstRender={firstRender}
          productCount={productCount}
          products={products}
          current={searchParams.pageNumber}
          pageSize={searchParams.pageSize}
          onPageChange={onPageChange}
          onDelete={onDeleteButton}
        />
      </div>
    </StoreMenuCont>
  );
}
export default AdminProducts;
