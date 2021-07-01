import {
  UPDATE_PARAMS,
  CHANGE_RESPONSIVE,
  UPDATE_PATH,
  UPDATE_LOADING,
  UPDATE_SESSION_DATA
} from 'Types';

const INITIAL_STATE = {
  isMovil: false,
  isLoading: false,
  currentPath: '',
  currentParams: '',
  sessionData: {}
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_RESPONSIVE:
      return {
        ...state,
        isMovil: payload
      };

    case UPDATE_PATH:
      return {
        ...state,
        currentPath: payload
      };

    case UPDATE_PARAMS:
      return {
        ...state,
        currentParams: payload
      };

    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: payload
      };

    case UPDATE_SESSION_DATA:
      return {
        ...state,
        sessionData: {
          ...state.sessionData,
          ...payload
        }
      };

    default:
      return state;
  }
};
