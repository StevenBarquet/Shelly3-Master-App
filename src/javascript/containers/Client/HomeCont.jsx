// ---Dependencys
import React, { useEffect } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { getPublicHomeAction } from 'Actions/home';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import DinamicCarousel from 'Comp/Client/Home/DinamicCarousel';
import BuySteps from 'Comp/Client/Home/BuySteps';
import ButtonProd from 'Comp/Client/Home/ButtonProd';
import Destacados from 'Comp/Client/Home/Destacados';
// ---Others
import { title } from 'Others/labels.json';
// --Request
import { getHomePublic } from 'Others/peticiones.js';
import { asyncHandler, testError } from 'Others/requestHandlers.js';

// ------------------------------------------ COMPONENT-----------------------------------------
function HomeCont() {
  // ----------------------- hooks, const, props y states
  // Redux States
  const { banners, paragraph, products } = useSelector(
    reducers => reducers.homeReducer
  );
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const updateHomeReducer = data => dispatchR(getPublicHomeAction(data));
  const isLoading = flag => dispatchR(updateLoading(flag));
  const { main, sub } = title;
  useEffect(() => getHomeData(), []);

  // ----------------------- Metodos Principales
  function getHomeData() {
    isLoading(true);
    asyncHandler(getHomePublic, onSuccessData, onError);
  }

  // ----------------------- Metodos Auxiliares
  function onSuccessData(data) {
    updateHomeReducer(data);
    isLoading(false);
  }

  function onError(err) {
    testError(err);
    isLoading(false);
  }
  // ----------------------- Render
  return (
    <>
      <div className="h-title">
        {main} <span>{sub}</span>
      </div>
      <p>
        ¡Lo <span>mejor</span> te espera!
      </p>
      <DinamicCarousel isMovil={isMovil} banners={banners} />
      <div className="home-container">
        <p>{paragraph || 'Cargando...'}</p>
        <Destacados items={products} />
        <BuySteps />
        <ButtonProd />
      </div>
    </>
  );
}

export default HomeCont;
