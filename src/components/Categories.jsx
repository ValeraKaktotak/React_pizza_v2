import { useState } from 'react'

const Categories = () => {
  let [active, setActive] = useState(0)
  const addActive = (index) => {
    setActive(index)
  }
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => {
            addActive(0)
          }}
          className={active === 0 ? 'active' : ''}
        >
          Все
        </li>
        <li
          onClick={() => {
            addActive(1)
          }}
          className={active === 1 ? 'active' : ''}
        >
          Мясные
        </li>
        <li
          onClick={() => {
            addActive(2)
          }}
          className={active === 2 ? 'active' : ''}
        >
          Вегетарианская
        </li>
        <li
          onClick={() => {
            addActive(3)
          }}
          className={active === 3 ? 'active' : ''}
        >
          Гриль
        </li>
        <li
          onClick={() => {
            addActive(4)
          }}
          className={active === 4 ? 'active' : ''}
        >
          Острые
        </li>
        <li
          onClick={() => {
            addActive(5)
          }}
          className={active === 5 ? 'active' : ''}
        >
          Закрытые
        </li>
      </ul>
    </div>
  )
}

export default Categories
