import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'
import { sortList } from 'components/Sort'
import { changeCategory, urlQueryState } from 'redux/slices/filterSlice'
import { fetchPizzas } from 'redux/slices/pizzasSlice'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // search reducer
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  //pizzas reducer
  const pizzas = useSelector((state) => state.pizzasReducer.items)
  const status = useSelector((state) => state.pizzasReducer.status)

  //filter reducer
  const { categoryValue, sortType, sortOrder, paginatorPage } = useSelector((state) => state.filterReducer)

  let isUrlQuery = useRef(false)
  let isMounted = useRef(false)

  //Фун-я которая при вызове делает аксиос запрос
  function axiosPizzas() {
    dispatch(fetchPizzas({ categoryValue, searchValue, sortType, sortOrder, paginatorPage }))
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h1>
            😕
            <br />
            <span>Ничего не найдено</span>
          </h1>
          <p>К сожалению ваш запрос не может выполниться</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((item, index) => <PizzaBlock key={index} {...item} />)}
        </div>
      )}
      <Paginator />
    </div>
  )
}

export default Home
