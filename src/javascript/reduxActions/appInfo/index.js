import {
  UPDATE_PARAMS,
  CHANGE_RESPONSIVE,
  UPDATE_PATH,
  UPDATE_LOADING,
  UPDATE_SESSION_DATA
} from 'Types';

export const changeResponsiveFlag = newFlag => dispatch => {
  dispatch({
    type: CHANGE_RESPONSIVE,
    payload: newFlag
  });
};

export const updatePath = newPath => dispatch => {
  dispatch({
    type: UPDATE_PATH,
    payload: newPath
  });
};

export const updateSessionData = data => dispatch => {
  dispatch({
    type: UPDATE_SESSION_DATA,
    payload: data
  });
};

export const updateParams = newParam => dispatch => {
  dispatch({
    type: UPDATE_PARAMS,
    payload: newParam
  });
};

export const updateLoading = flag => dispatch => {
  dispatch({
    type: UPDATE_LOADING,
    payload: flag
  });
};
