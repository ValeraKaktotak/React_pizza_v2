import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'
import { sortList } from 'components/Sort'
import { changeCategory, urlQueryState, selectFilter } from 'redux/slices/filterSlice'
import { fetchPizzas, selectPizzas } from 'redux/slices/pizzasSlice'
import { useAppDispatch } from 'redux/store'

const Home:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //pizzas reducer
  const { items, status } = useSelector(selectPizzas)

  //filter reducer
  const { categoryValue, sortType, sortOrder, paginatorPage, searchValue } = useSelector(selectFilter)

  let isUrlQuery = useRef(false)
  let isMounted = useRef(false)

  //Фун-я которая при вызове делает аксиос запрос
  function axiosPizzas() {
    //@ts-ignore
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

  //После второго рендера вшивает в адресную строку параметры полученные с редакса
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryValue,
        sortType: sortType.type,
        sortOrder,
        paginatorPage,
        searchValue,
      })
      navigate(`/?${queryString}`)
    }
    isMounted.current = true
  }, [categoryValue, sortType, sortOrder, searchValue, paginatorPage, navigate])

  const changeCatHandle = React.useCallback((id:number) => {
    dispatch(changeCategory(id))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryValue}
          onChangeCategory={changeCatHandle}
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
            : items.map((item, index:number) => <PizzaBlock key={index} {...item} />)}
        </div>
      )}
      <Paginator />
    </div>
  )
}

export default Home
