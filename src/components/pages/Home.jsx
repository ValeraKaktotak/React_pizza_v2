import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'
import { changeCategory, urlQueryState } from 'redux/slices/filterSlice'
import { sortList } from 'components/Sort'

function Home() {
  console.log('RERENDER')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // search reducer
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  //main pizzas
  let [pizzas, setPizzas] = useState([])

  //filter reducer
  const { categoryValue, sortType, sortOrder, paginatorPage } = useSelector((state) => state.filterReducer)

  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect urlQueryState')
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortType = sortList.find((obj) => obj.type === params.sortType)
      dispatch(urlQueryState({ ...params, sortType }))
    }
  }, [])

  useEffect(() => {
    console.log('useEffect axios')
    setIsLoading(true)
    axios
      .get(
        `https://63be806cf5cfc0949b58f105.mockapi.io/items?${categoryValue > 0 ? `category=${categoryValue}` : ''}${
          searchValue !== '' ? `&search=${searchValue}` : ''
        }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
      )
      .then((res) => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryValue, sortType, sortOrder, searchValue, paginatorPage])

  useEffect(() => {
    console.log('useEffect queryString')
    const queryString = qs.stringify({
      categoryValue,
      sortType: sortType.type,
      sortOrder,
      paginatorPage,
      searchValue,
    })
    navigate(`?${queryString}`)
  }, [categoryValue, sortType, sortOrder, searchValue, paginatorPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryValue}
          onChangeCategory={(id) => {
            dispatch(changeCategory(id))
          }}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
      <Paginator />
    </div>
  )
}

export default Home
