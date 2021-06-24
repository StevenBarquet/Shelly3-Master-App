/* eslint-disable no-use-before-define */
// ---Dependencys
import React, { useEffect } from 'react';
import { SettingFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { logOut } from 'Others/peticiones.js';

// ------------------------------------------ COMPONENT-----------------------------------------
function LogoutCont() {
  const history = useHistory();
  useEffect(onLogout, []);

  function onLogout() {
    setTimeout(() => {
      logOutRequest();
    }, 800);
  }

  function logOutRequest() {
    asyncHandler(logOut, onSuccessLogout, testError);
  }

  function onSuccessLogout() {
    history.push('/master/login');
  }

  return (
    <div className="logout-message">
      <h1>Hasta luego ...</h1>
      <SettingFilled spin />
    </div>
  );
}

export default LogoutCont;
