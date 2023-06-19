import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { setPaginatorPage, selectFilterPaginatorPage } from 'redux/slices/filterSlice'
import style from './Paginator.module.scss'
import React from 'react'
import { useAppDispatch } from 'redux/store'

type pageCountProp = {
  pageCount?: number
}

const Paginator:React.FC<pageCountProp> = ({ pageCount = 3 }) => {
  const startPage = useSelector(selectFilterPaginatorPage)
  const dispatch = useAppDispatch()
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        dispatch(setPaginatorPage(e.selected + 1))
      }}
      pageRangeDisplayed={4}
      forcePage={startPage - 1}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}
export default Paginator
