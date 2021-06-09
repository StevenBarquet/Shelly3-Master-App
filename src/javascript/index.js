// import '../css/index.css';
import '../css/index.less';
import React from 'react';
import { render } from 'react-dom';

// redux configuration
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

// reducers
import reducers from 'Reducers';

// main container
import AppContainer from './AppContainer';

// More redux configuration
let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

const store = createStore(
  reducers, // todos los reducers
  {}, // estado inicial
  composeEnhancers(applyMiddleware(reduxThunk))
);

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  rootElement
);
