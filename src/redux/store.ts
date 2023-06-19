import { configureStore } from '@reduxjs/toolkit'
import filterReducer from 'redux/slices/filterSlice'
import cartReducer from 'redux/slices/cartSlice'
import pizzasReducer from 'redux/slices/pizzasSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch