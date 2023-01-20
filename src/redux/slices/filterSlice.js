import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterValue: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.filterValue = action.payload
    },
  },
})

export const { addFilter } = filterSlice.actions

export default filterSlice.reducer
