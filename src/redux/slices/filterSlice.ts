import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

const initialState = {
  categoryValue: 0,
  sortType: {
    name: 'популярности',
    type: 'rating',
  },
  sortOrder: true,
  paginatorPage: 1,
  searchValue: '',
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
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state: RootState) => state.filterReducer
export const selectFilterPaginatorPage = (state: RootState) => state.filterReducer.paginatorPage

export const { changeCategory, changeSortType, changeSortOrder, setPaginatorPage, urlQueryState, changeSearchValue } =
  filterSlice.actions

export default filterSlice.reducer
