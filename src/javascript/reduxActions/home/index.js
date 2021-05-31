import { GET_PUBLIC_HOME } from 'Types';

export const getPublicHomeAction = homeData => dispatch => {
  dispatch({
    type: GET_PUBLIC_HOME,
    payload: homeData
  });
};
