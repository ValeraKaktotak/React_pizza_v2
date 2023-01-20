import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sortType: {
    name: 'популярности',
    type: 'rating',
  },
  sortOrder: true,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSortType: (state, action) => {
      state.sortType = action.payload
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
  },
})

export const { changeSortType, changeSortOrder } = sortSlice.actions

export default sortSlice.reducer
