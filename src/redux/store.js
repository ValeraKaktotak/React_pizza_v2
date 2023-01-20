import { configureStore } from '@reduxjs/toolkit'
import filterReducer from 'redux/slices/filterSlice'
import sortReducer from 'redux/slices/sortSlice'
import searchReducer from 'redux/slices/searchSlice'

export const store = configureStore({
  reducer: {
    filterReducer,
    sortReducer,
    searchReducer,
  },
})
