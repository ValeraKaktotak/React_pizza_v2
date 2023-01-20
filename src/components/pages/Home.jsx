import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'
import { addFilter } from 'redux/slices/filterSlice'
import { changeSortType, changeSortOrder } from 'redux/slices/sortSlice'

function Home() {
  const dispatch = useDispatch()

  // search +
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  //main pizzas
  let [pizzas, setPizzas] = useState([])

  //filter +
  const filterCategory = useSelector((state) => state.filterReducer.filterValue)

  //sort +
  const sortType = useSelector((state) => state.sortReducer.sortType)
  //sort_asc_desc +
  const sortOrder = useSelector((state) => state.sortReducer.sortOrder)

  let [isLoading, setIsLoading] = useState(true)
  let [paginatorPage, setPaginatorPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://63be806cf5cfc0949b58f105.mockapi.io/items?${filterCategory > 0 ? `category=${filterCategory}` : ''}${
        searchValue !== '' ? `&search=${searchValue}` : ''
      }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setPizzas(resp)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [filterCategory, sortType, sortOrder, searchValue, paginatorPage])
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={filterCategory}
          onChangeCategory={(id) => {
            dispatch(addFilter(id))
          }}
        />
        <Sort
          sortValue={sortType}
          onChangeSort={(sortObj) => {
            dispatch(changeSortType(sortObj))
          }}
          setSortOrder={(sortOrder) => {
            dispatch(changeSortOrder(sortOrder))
          }}
          sortOrder={sortOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
      <Paginator
        handlePageClick={(number) => {
          setPaginatorPage(number)
        }}
      />
    </div>
  )
}

export default Home
