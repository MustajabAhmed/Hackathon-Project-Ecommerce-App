import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  items: Array<any>;
  totalAmount: number;
  totalQuantitiy: number;

}

const initialState: CounterState = {
  items: [],
  totalAmount: 0,
  totalQuantitiy: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<any>) => {
      state.totalQuantitiy += actions.payload.quantity;
    },
    // removeFromCart: (state, actions: PayloadAction<any>) => {
    //   state.totalQuantitiy -= actions.payload.quantity;
    // },
    // clearCart: (state, action: PayloadAction<number>) => {
    //   state = initialState;
    // },
  },
})

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions

export default cartSlice.reducer;