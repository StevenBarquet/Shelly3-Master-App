// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ------------------------------------------ COMPONENT-----------------------------------------
const ButtonProd = () => {
  return (
    <Link to="/productos">
      <div className="center-block">
        <ButtonMlg
          label="Ver catálogo ahora"
          variant="yellow"
          size="default"
          widthB="220px"
          icon={<ShoppingOutlined />}
        />
      </div>
    </Link>
  );
};

export default ButtonProd;
