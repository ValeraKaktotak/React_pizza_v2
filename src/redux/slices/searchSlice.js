import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
  },
})

export const { changeSearchValue } = searchSlice.actions

export default searchSlice.reducer
