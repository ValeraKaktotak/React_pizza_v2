import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
  const { categoryValue, searchValue, sortType, sortOrder, paginatorPage } = params
  const res = await axios.get(
    `https://63be806cf5cfc0949b58f105.mockapi.io/items?${categoryValue > 0 ? `category=${categoryValue}` : ''}${
      searchValue !== '' ? `&search=${searchValue}` : ''
    }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
  )
  return res.data
})

const initialState = {
  items: [],
  status: '', //loading | success | error
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
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'done'
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error'
    })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
