import { useState } from 'react'

const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
  let [active, setActive] = useState(0)

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setActive(index)
              }}
              className={active === index ? 'active' : ''}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
