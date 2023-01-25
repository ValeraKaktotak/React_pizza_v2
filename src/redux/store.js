import { configureStore } from '@reduxjs/toolkit'
import filterReducer from 'redux/slices/filterSlice'
import searchReducer from 'redux/slices/searchSlice'
import cartReducer from 'redux/slices/cart.slice'

export const store = configureStore({
  reducer: {
    filterReducer,
    searchReducer,
    cartReducer,
  },
})
