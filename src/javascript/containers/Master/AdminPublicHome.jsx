// ---Dependencys
import React from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';

// Permite buscar, redirigir a editar, agregar a home, ver ficha con background close button
// ------------------------------------------ COMPONENT-----------------------------------------
function AdminPublicHome() {
  return (
    <StoreMenuCont>
      <div className="store-welcom-container">
        <h1>Administrador de Home</h1>
      </div>
    </StoreMenuCont>
  );
}
export default AdminPublicHome;
