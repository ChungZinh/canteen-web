import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingItem.quantity += action.payload.quantity;
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ hàng
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        // Increase the item's quantity by 1
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem && existingItem.quantity > 1) {
        // Decrease the item's quantity by 1 (but not below 1)
        existingItem.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },

    // Bạn có thể thêm các reducer khác như updateQuantity hoặc handleError nếu cần
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
