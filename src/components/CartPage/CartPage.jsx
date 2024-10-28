import Cart from './Cart/Cart';
import Order from './Order/Order';
import React from 'react';

function CartPage() {
  return (
    <React.Fragment>
      <Cart />
      <Order />
    </React.Fragment>
  )
}

export default CartPage;