import {
  UPDATE_CURRENT_PRODUCTS,
  UPDATE_SEARCH_PARAMS,
  UPDATE_PAGE,
  UPDATE_PAGE_AND_SIZE,
  UPDATE_ONE_PRODUCT,
  PRODUCTS_NOT_UPDATED,
  CHANGE_FIRST_RENDER,
  RESET_SEARCH_PARAMS
} from 'Types';

export const changeFirstRender = flag => dispatch => {
  dispatch({
    type: CHANGE_FIRST_RENDER,
    payload: flag
  });
};

export const updateSearchParams = data => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_PARAMS,
    payload: data
  });
};

export const updateProducts = data => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_PRODUCTS,
    payload: data
  });
};
export const setNotUpdated = () => dispatch => {
  dispatch({
    type: PRODUCTS_NOT_UPDATED
  });
};
export const resetSearchParams = () => dispatch => {
  dispatch({
    type: RESET_SEARCH_PARAMS
  });
};
export const updateOneProduct = data => dispatch => {
  dispatch({
    type: UPDATE_ONE_PRODUCT,
    payload: data
  });
};

export const updatePage = data => dispatch => {
  const { newPage, newSize } = data;
  if (newSize) {
    dispatch({
      type: UPDATE_PAGE_AND_SIZE,
      payload: { pageNumber: newPage, pageSize: newSize }
    });
  } else {
    dispatch({
      type: UPDATE_PAGE,
      payload: newPage
    });
  }
};
