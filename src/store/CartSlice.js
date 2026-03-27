import { createSlice } from "@reduxjs/toolkit";
import { getGuestId } from "../utils/helper";

const loadCart = () => {
  try {
    const guestId = getGuestId();
    const data = localStorage.getItem(`cart_${guestId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveCart = (cart) => {
  const guestId = getGuestId();
  localStorage.setItem(`cart_${guestId}`, JSON.stringify(cart));
};

const initialState = {
  cart: loadCart(),
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.cartons += product.minCarton;
      } else {
        state.cart.push(product);
      }

      saveCart(state.cart);
      state.isCartOpen = true;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCart(state.cart);
    },

    increaseCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.cartons += 1;
        saveCart(state.cart);
      }
    },

    decreaseCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (!item) return;

      if (item.cartons > item.minCarton) {
        item.cartons -= 1;
        saveCart(state.cart);
      }
    },

    toggleCart: (state, action) => {
      state.isCartOpen = action.payload;
    },

    clearCart: (state) => {
      const guestId = getGuestId();
      state.cart = [];
      localStorage.removeItem(`cart_${guestId}`);
    },
  },
});

export const {
  addToCart,
  removeItem,
  increaseCart,
  decreaseCart,
  toggleCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
