/* eslint-disable no-use-before-define */
// ---Dependencys
import React, { useEffect } from 'react';
import { SettingFilled } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';

// ------------------------------------------ COMPONENT-----------------------------------------
const MasterLogoutCont = withRouter(props => {
  useEffect(onLogout, []);

  function onLogout() {
    const { history } = props;
    setTimeout(() => {
      localStorage.setItem('htFBgj3nK6QwY5hm', '');
      history.push('/');
    }, 800);
  }

  return (
    <div className="logout-message">
      <h1>Hasta luego ...</h1>
      <SettingFilled spin />
    </div>
  );
});

export default MasterLogoutCont;
