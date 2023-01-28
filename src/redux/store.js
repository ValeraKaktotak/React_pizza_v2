import { configureStore } from '@reduxjs/toolkit'
import filterReducer from 'redux/slices/filterSlice'
import searchReducer from 'redux/slices/searchSlice'
import cartReducer from 'redux/slices/cartSlice'
import pizzasReducer from 'redux/slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filterReducer,
    searchReducer,
    cartReducer,
    pizzasReducer,
  },
})
