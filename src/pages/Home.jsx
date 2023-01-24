import { useEffect, useState, useRef } from 'react'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // search reducer
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  //main pizzas
  let [pizzas, setPizzas] = useState([])

  //filter reducer
  const { categoryValue, sortType, sortOrder, paginatorPage } = useSelector((state) => state.filterReducer)

  let [isLoading, setIsLoading] = useState(false)
  let isUrlQuery = useRef(false)
  let isMounted = useRef(false)

  //Фун-я которая при вызове делает аксиос запрос
  function axiosPizzas() {
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
  }

  // При первом рендере проверяет адресную строку на наличие параметров, если они есть диспатчит их в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortType = sortList.find((obj) => obj.type === params.sortType)
      dispatch(urlQueryState({ ...params, sortType }))
      isUrlQuery.current = true
    }
  }, [])

  //Отправляет аксиос запрос к АПИ
  useEffect(() => {
    if (!isUrlQuery.current) {
      axiosPizzas()
    }
    isUrlQuery.current = false
    window.scrollTo(0, 0)
  }, [categoryValue, sortType, sortOrder, searchValue, paginatorPage])

  //После первого рендера вшивает в адресную строку параметры полученные с редакса
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryValue,
        sortType: sortType.type,
        sortOrder,
        paginatorPage,
        searchValue,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
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
