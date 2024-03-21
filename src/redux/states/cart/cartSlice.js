import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      let existingItem = state.cart.find((item) => item.id === payload.id);
      if (existingItem) {
        existingItem.stock += 1;
      } else {
        // Create a new object to ensure immutability
        const newCartItem = { ...payload, stock: 1 };
        state.cart.push(newCartItem);
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, stock: item + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, stock: item - 1 };
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  clearCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  addToCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
