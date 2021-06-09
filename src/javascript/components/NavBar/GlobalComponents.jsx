// --- Dependencys
import React from 'react';
// --- Redux
import { useSelector } from 'react-redux';
// ---Components
import LoadingFullScreen from 'Comp/NavBar/LoadingFullScreen';

// -----------------------------------------COMPONENT-----------------------

function GlobalComponents() {
  // Redux States
  const { isLoading } = useSelector(reducers => reducers.appInfoReducer);
  return (
    <>
      <LoadingFullScreen isLoading={isLoading} />
    </>
  );
}

export default GlobalComponents;
