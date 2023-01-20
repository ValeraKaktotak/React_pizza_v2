import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state = action.payload
    },
  },
})

export const { addFilter } = filterSlice.actions

export default filterSlice.reducer
