// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit"
import  {PayloadAction} from "@reduxjs/toolkit"

// Define types for CartItem and CartState
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      // Recalculate total
      state.total = state.items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Recalculate total
      state.total = state.items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Recalculate total
      state.total = state.items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
