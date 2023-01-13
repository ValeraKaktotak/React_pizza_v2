import { BiSearchAlt } from 'react-icons/bi'
import style from './Search.module.scss'

function Search() {
  return (
    <div className={style.root}>
      <input className={style.input} placeholder="Pizza search..." />
      <div className={style.icon}>
        <BiSearchAlt />
      </div>
    </div>
  )
}

export default Search
