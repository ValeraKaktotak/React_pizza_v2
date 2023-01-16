import ReactPaginate from 'react-paginate'
import style from './Paginator.module.scss'

function Paginator({ pageCount = 3, handlePageClick }) {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        handlePageClick(e.selected + 1)
      }}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}
export default Paginator
