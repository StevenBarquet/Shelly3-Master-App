// ---Dependencys
import React from 'react';
// ---Others
import { priceFormat } from 'Others/otherMethods';
// ------------------------------------------ COMPONENT-----------------------------------------
function CartMaths(props) {
  const { subTotal, size } = props;
  return (
    <div className="store-CartMaths-container">
      <h3>Cuenta</h3>
      Productos: <span>{size}</span>
      <hr />
      <h4>
        Sub-Total: <span>{priceFormat(subTotal)}</span>
      </h4>
    </div>
  );
}

export default CartMaths;
