import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { setPaginatorPage } from 'redux/slices/filterSlice'
import style from './Paginator.module.scss'

function Paginator({ pageCount = 3 }) {
  const dispatch = useDispatch()
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
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}
export default Paginator
