import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryValue: 0,
  sortType: {
    name: 'популярности',
    type: 'rating',
  },
  sortOrder: true,
  paginatorPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.categoryValue = action.payload
    },
    changeSortType(state, action) {
      state.sortType = action.payload
    },
    changeSortOrder(state, action) {
      state.sortOrder = action.payload
    },
    setPaginatorPage(state, action) {
      state.paginatorPage = action.payload
    },
    urlQueryState(state, action) {
      state.categoryValue = Number(action.payload.categoryValue)
      state.paginatorPage = Number(action.payload.paginatorPage)
      state.sortOrder = JSON.parse(action.payload.sortOrder)
      state.sortType = action.payload.sortType
    },
  },
})

export const selectFilter = (state) => state.filterReducer
export const selectFilterPaginatorPage = (state) => state.filterReducer.paginatorPage

export const { changeCategory, changeSortType, changeSortOrder, setPaginatorPage, urlQueryState } = filterSlice.actions

export default filterSlice.reducer
