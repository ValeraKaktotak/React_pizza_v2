import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryValue: 0,
  sortType: {
    name: 'популярности',
    type: 'rating',
  },
  sortOrder: true,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.categoryValue = action.payload
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
  },
})

export const { addFilter, changeSortType, changeSortOrder } = filterSlice.actions

export default filterSlice.reducer
