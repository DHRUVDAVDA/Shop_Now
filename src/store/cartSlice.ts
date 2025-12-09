// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const recalcTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const incoming = action.payload;
      const existing = state.items.find(i => i.id === incoming.id);

      if (existing) {
        // add incoming.quantity (if provided) to existing
        existing.quantity += incoming.quantity ?? 1;
      } else {
        // ensure quantity is set
        const qty = incoming.quantity ?? 1;
        state.items.push({ ...incoming, quantity: qty });
      }

      // always recalc total (safe)
      state.total = recalcTotal(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.total = recalcTotal(state.items);
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = recalcTotal(state.items);
      }
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove if would go below 1
        state.items = state.items.filter(i => i.id !== action.payload);
      }
      state.total = recalcTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
