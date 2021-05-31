import {
  UPDATE_CURRENT_PRODUCTS,
  UPDATE_SEARCH_PARAMS,
  UPDATE_PAGE,
  UPDATE_PAGE_AND_SIZE,
  UPDATE_ONE_PRODUCT,
  CHANGE_FIRST_RENDER,
  PRODUCTS_NOT_UPDATED,
  RESET_SEARCH_PARAMS
} from 'Types';

const INITIAL_STATE = {
  masterProducts: {
    productCount: 0,
    products: [],
    updatedData: false,
    firstRender: true,
    searchParams: {
      pageNumber: 1,
      pageSize: 30,
      searchedValue: null,
      filters: {
        categoria: null,
        descuento: null,
        nuevo: null,
        online: null
      },
      sortBy: '{ "nombre": 1 }'
    }
  },
  singleProduct: {
    productData: {}
  }
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_PARAMS: {
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          searchParams: { ...state.masterProducts.searchParams, ...payload }
        }
      };
    }

    case CHANGE_FIRST_RENDER: {
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          firstRender: payload
        }
      };
    }

    case UPDATE_CURRENT_PRODUCTS:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          updatedData: true,
          ...payload
        }
      };

    case UPDATE_PAGE:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          searchParams: {
            ...state.masterProducts.searchParams,
            pageNumber: payload
          }
        }
      };

    case RESET_SEARCH_PARAMS:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          searchParams: {
            pageNumber: 1,
            pageSize: 30,
            searchedValue: null,
            filters: {
              categoria: null,
              descuento: null,
              nuevo: null,
              online: null
            },
            sortBy: '{ "nombre": 1 }'
          }
        }
      };

    case PRODUCTS_NOT_UPDATED:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          updatedData: false
        }
      };

    case UPDATE_PAGE_AND_SIZE:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          searchParams: {
            ...state.masterProducts.searchParams,
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize
          }
        }
      };

    case UPDATE_ONE_PRODUCT:
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          productData: payload
        }
      };

    default:
      return state;
  }
};
