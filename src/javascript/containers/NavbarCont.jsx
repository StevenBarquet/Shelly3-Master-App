// ---Dependencys
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  changeResponsiveFlag,
  updatePath,
  updateParams
} from 'Actions/appInfo';
// ---Components
import AdminMenu from 'Comp/NavBar/AdminMenu';
import ClientMenu from 'Comp/NavBar/ClientMenu';
import GlobalComponents from 'Comp/NavBar/GlobalComponents';
// ---Others
import logo from 'Images/logoStoreL.png';
import isMovilDetector from 'Others/isMovilDetector';

// ------------------------------------------ COMPONENT-----------------------------------------
const NavbarCont = withRouter(props => {
  const currentPath = props.location.pathname;
  const urlParams = props.location.search;
  const isAdmin = new RegExp('^[/][m][a][s][t][e][r]');
  // Redux States
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const updateResponsiveData = data => dispatchR(changeResponsiveFlag(data));
  const updateCurrentPath = () => dispatchR(updatePath(currentPath));
  const updateCurrentParams = () => dispatchR(updateParams(urlParams));

  const responsiveData = isMovilDetector();
  useEffect(() => {
    updateResponsiveData(responsiveData);
  }, [responsiveData]);

  useEffect(() => updateCurrentPath(), [currentPath]);
  useEffect(() => updateCurrentParams(), [urlParams]);

  if (currentPath === '/master/login') {
    return <GlobalComponents />;
  }
  if (isAdmin.test(currentPath)) {
    return (
      <>
        <AdminMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />
        <GlobalComponents />
      </>
    );
  }
  return (
    <>
      <ClientMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />
      <GlobalComponents />
    </>
  );
});

export default NavbarCont;
