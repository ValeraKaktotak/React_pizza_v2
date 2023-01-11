import { useEffect, useState } from 'react'

import Categories from 'components/Categories'
import Sort from 'components/Sort'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'

function Home() {
  let [pizzas, setPizzas] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch('https://63be806cf5cfc0949b58f105.mockapi.io/items')
      .then((resp) => resp.json())
      .then((resp) => {
        setPizzas(resp)
        setIsLoading(true)
      })
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
    </>
  )
}

export default Home