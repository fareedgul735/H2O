import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

// ✅ Save to localStorage
const saveCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.log("Save error", error);
  }
};

const initialState = {
  cart: loadCart(),
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔥 ADD TO CART
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

    // 🔥 REMOVE ITEM
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCart(state.cart);
    },

    // 🔥 INCREASE QUANTITY
    increaseCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.cartons += 1;
        saveCart(state.cart);
      }
    },

    // 🔥 DECREASE QUANTITY (minCarton safe)
    decreaseCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (!item) return;

      if (item.cartons > item.minCarton) {
        item.cartons -= 1;
        saveCart(state.cart);
      }
    },

    // 🔥 TOGGLE CART SIDEBAR
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload;
    },

    // 🔥 CLEAR CART (Checkout ke baad)
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

// ✅ EXPORT ACTIONS
export const {
  addToCart,
  removeItem,
  increaseCart,
  decreaseCart,
  toggleCart,
  clearCart,
} = cartSlice.actions;

// ✅ EXPORT REDUCER
export default cartSlice.reducer;