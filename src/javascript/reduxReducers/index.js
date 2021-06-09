import { combineReducers } from 'redux';
import appInfoReducer from 'Reducers/appInfo';
import homeReducer from 'Reducers/home';
import masterReducer from 'Reducers/master';

export default combineReducers({
  appInfoReducer,
  homeReducer,
  masterReducer
});
