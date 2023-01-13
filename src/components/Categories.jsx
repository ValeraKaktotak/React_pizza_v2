const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

function Categories({ categoryValue, changeCategory }) {
  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                changeCategory(index)
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
}

export default Categories
