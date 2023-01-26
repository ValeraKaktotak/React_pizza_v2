import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCoast: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalCoast = state.items.reduce((sum, obj) => {
        return obj.count * obj.price + sum
      }, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
