import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'
import { changeCategory } from 'redux/slices/filterSlice'

function Home() {
  const dispatch = useDispatch()

  // search reducer
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  //main pizzas
  let [pizzas, setPizzas] = useState([])

  //filter reducer
  const { categoryValue, sortType, sortOrder, paginatorPage } = useSelector((state) => state.filterReducer)

  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // fetch(
    //   `https://63be806cf5cfc0949b58f105.mockapi.io/items?${categoryValue > 0 ? `category=${categoryValue}` : ''}${
    //     searchValue !== '' ? `&search=${searchValue}` : ''
    //   }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
    // )
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     setPizzas(resp)
    //     setIsLoading(false)
    //   })
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
