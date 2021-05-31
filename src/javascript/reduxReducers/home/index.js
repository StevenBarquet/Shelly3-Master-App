import { GET_PUBLIC_HOME } from 'Types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PUBLIC_HOME:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
