// ---Dependencys
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { checkRoute } from 'Others/peticiones.js';

// ------------------------------------------ COMPONENT-----------------------------------------
// Valida si estás autenticado
function AuthValidate(props) {
  // ----------------------- hooks, const, props y states
  const { children } = props;
  const history = useHistory();
  // Redux States
  const { currentPath } = useSelector(reducers => reducers.appInfoReducer);

  const [localRoute, setLocalRoute] = useState(currentPath);

  const dispatchR = useDispatch();
  // Redux Actions
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(updateLocalRoute, [currentPath]);

  // ----------------------- Metodos Principales
  function updateLocalRoute() {
    if (localRoute !== currentPath) {
      onValidate();
      setLocalRoute(currentPath);
    }
  }

  function onValidate() {
    if (currentPath === '/master' || currentPath === '/master/') {
      history.push('/master/login');
    } else {
      bypassValidation();
    }
  }

  // ----------------------- Metodos Auxiliares
  function bypassValidation() {
    if (currentPath) {
      const whitelist = [
        '/master',
        '/master/',
        '/master/login',
        '/master/salir'
      ];
      if (whitelist.indexOf(currentPath) === -1) {
        onCheckRoute();
      }
    }
  }

  function onCheckRoute() {
    isLoading(true);
    const reqData = { route: currentPath };
    asyncHandler(checkRoute, onSuccessAuth, onErrorAuth, reqData);
  }

  function onSuccessAuth() {
    isLoading(false);
  }

  function onErrorAuth(data) {
    isLoading(false);
    testError(data);
  }

  // ----------------------- Render
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthValidate;
