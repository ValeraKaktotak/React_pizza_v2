import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'redux/store'

type SortType = {
  name: string,
  type: string,
}

interface ParamsType {
  categoryValue: number,
  searchValue: string,
  sortType: SortType,
  sortOrder: string,
  paginatorPage: string
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params :ParamsType) => {
  const { categoryValue, searchValue, sortType, sortOrder, paginatorPage } = params
  const res = await axios.get(
    `https://63be806cf5cfc0949b58f105.mockapi.io/items?${categoryValue > 0 ? `category=${categoryValue}` : ''}${
      searchValue !== '' ? `&search=${searchValue}` : ''
    }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
  )
  return res.data
})

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: string;
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading', //loading | success | error
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'done'
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectPizzas = (state:RootState) => state.pizzasReducer

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
