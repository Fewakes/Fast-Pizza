import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    // payload = pizzaId
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

// Export the action creators from the cart slice
export const {
  addItem, // Adds a new item to the cart
  deleteItem, // Removes an item from the cart by its pizzaId
  increaseItemQuantity, // Increases the quantity of an item in the cart by 1
  decreaseItemQuantity, // Decreases the quantity of an item in the cart by 1
  clearCart, // Removes all items from the cart
} = cartSlice.actions;

// Export the reducer function for the cart slice
export default cartSlice.reducer;

// Export additional selectors for getting data from the cart slice
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0); // Returns the total quantity of items in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0); // Returns the total price of items in the cart
export const getCart = (state) => state.cart.cart; // Returns the entire cart array

// Returns the quantity of a specific item in the cart by its pizzaId
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// use the reselect library instead of these functions for performance reasons in big projects
