import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCoast: 0,
  items: [],
}
function resetTotalCoast(state) {
  state.totalCoast = state.items.reduce((sum, obj) => {
    return obj.count * obj.price + sum
  }, 0)
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
      resetTotalCoast(state)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
        resetTotalCoast(state)
      }
    },
    removeItem(state, action) {
      if (window.confirm('Are you sure?')) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
        resetTotalCoast(state)
      }
    },
    clearItems(state) {
      if (window.confirm('Are you sure?')) {
        state.items = []
        resetTotalCoast(state)
      }
    },
  },
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
