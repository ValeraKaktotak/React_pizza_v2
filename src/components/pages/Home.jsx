import { useEffect, useState } from 'react'

import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'

function Home() {
  let [pizzas, setPizzas] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  let [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://63be806cf5cfc0949b58f105.mockapi.io/items?category=${activeCategory}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setPizzas(resp)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [activeCategory])
  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} changeCategory={(id) => setActiveCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
    </div>
  )
}

export default Home
