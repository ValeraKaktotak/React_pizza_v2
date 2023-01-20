import { useContext, useEffect, useState } from 'react'
import { SearchContext } from 'App'
import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Paginator from 'components/Paginator'

function Home() {
  let searchValue = useContext(SearchContext).searchValue

  let [pizzas, setPizzas] = useState([])

  let [isLoading, setIsLoading] = useState(true)

  let [activeCategory, setActiveCategory] = useState(0)
  let [sortType, setSortType] = useState({
    name: 'популярности',
    type: 'rating',
  })
  let [sortOrder, setSortOrder] = useState(true)

  let [paginatorPage, setPaginatorPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://63be806cf5cfc0949b58f105.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}${
        searchValue !== '' ? `&search=${searchValue}` : ''
      }&sortBy=${sortType.type}&order=${sortOrder ? `asc` : `desc`}&page=${paginatorPage}&limit=4`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setPizzas(resp)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [activeCategory, sortType, sortOrder, searchValue, paginatorPage])
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={activeCategory}
          onChangeCategory={(id) => {
            setActiveCategory(id)
          }}
        />
        <Sort
          sortValue={sortType}
          onChangeSort={(sortObj) => {
            setSortType(sortObj)
          }}
          setSortOrder={setSortOrder}
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
