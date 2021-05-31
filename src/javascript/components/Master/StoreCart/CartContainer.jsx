// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
// ---Cont
import SearchCont from 'Cont/Master/StoreCart/SearchCont';
// ---Components
import CartItem from 'Comp/Master/StoreCart/CartItem';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';

// ---AUX COMPONENTS
function CartList(props) {
  const { items, updatePiezas, onDeleteButton } = props;
  if (!items || items.length === 0) return null;
  return (
    <Row>
      {items.map(item => (
        <CartItem
          key={item._id}
          {...item}
          onDeleteButton={onDeleteButton}
          updatePiezas={updatePiezas}
        />
      ))}
    </Row>
  );
}
function ClearButton(props) {
  const { onClearCart, length } = props;
  if (length > 0)
    return (
      <Col className="center-block" xs={24} sm={24} lg={24}>
        <ButtonMlg
          variant="purple"
          size="normal"
          htmlType="button"
          widthB="60%"
          onClick={onClearCart}
          label="Limpiar carrito"
          icon={<ClearOutlined />}
        />
      </Col>
    );
  return null;
}
// ------------------------------------------ COMPONENT-----------------------------------------
function CartContainer(props) {
  const {
    addToCart,
    items,
    updatePiezas,
    onDeleteButton,
    onClearCart,
    handleResponsable,
    responsableVenta
  } = props;
  return (
    <>
      <Row style={{ marginTop: 30 }}>
        <Col xs={24} sm={24} lg={24}>
          <SearchCont
            handleResponsable={handleResponsable}
            responsableVenta={responsableVenta}
            addToCart={addToCart}
          />
        </Col>
        <ClearButton length={items.length} onClearCart={onClearCart} />
        <Col xs={24} sm={24} lg={24}>
          <CartList
            updatePiezas={updatePiezas}
            items={items}
            onDeleteButton={onDeleteButton}
          />
        </Col>
      </Row>
    </>
  );
}

export default CartContainer;
