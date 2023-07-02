import React from "react"

const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  categoryValue: number
  onChangeCategory: (index:number) => void
}

const Categories:React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                onChangeCategory(index)
              }}
              className={categoryValue === index ? 'active' : ''}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default Categories
