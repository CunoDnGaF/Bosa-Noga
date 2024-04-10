import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  loading: false,
  error: null,
  success: false,
  owner: {
    phone: '',
    address: '',
  },
  body: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      if(state.items.find((item) => item != null && item.name == product.name)) {
        state.items.map((item) => {
          if(item != null && item.id == product.id) {
            item.count += product.count;
            return item;
          }
        });
        localStorage.setItem('cart', JSON.stringify(state.items));
        state.success = false;
      } else {
        localStorage.setItem('cart', JSON.stringify([...state.items, product]));
        state.items = [...state.items, product];
        state.success = false;
      }
    },
    removeItem(state, action) {
      const cart = state.items.filter((item) => item.name != action.payload);
      state.items = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    changeOwnerData(state, action) {
      const key = action.payload.id;
      state.owner[key] = action.payload.value;

      const products = [];
      state.items.forEach((item) => {
        products.push({
        id: item.id,
        price: item.price,
        count: item.count,
        });
      });
      
    const body = {
      owner: {
        phone: state.owner.phone,
        address: state.owner.address,
      },
      items: products,
    };

    state.body = body;
    },
    orderLoading(state) {
      state.loading = true;
    },
    orderSuccess(state) {
      state.loading = false;
      state.success = true;
      localStorage.removeItem('cart');
      state.items = [];
    },
    orderError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {orderLoading, orderSuccess, orderError, changeOwnerData, addToCart, removeItem, orderClear} = cartSlice.actions;
export default cartSlice.reducer;