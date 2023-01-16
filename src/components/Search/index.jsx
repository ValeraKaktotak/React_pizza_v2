import { useContext } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineClear } from 'react-icons/ai'
import { SearchContext } from 'App'
import style from './Search.module.scss'

function Search() {
  let { searchValue, setSearchValue } = useContext(SearchContext)

  return (
    <div className={style.root}>
      <input
        onChange={(e) => {
          setSearchValue(e.currentTarget.value)
        }}
        className={style.input}
        placeholder="Pizza search..."
        value={searchValue}
      />
      <div className={style.icon}>
        <BiSearchAlt />
      </div>
      {searchValue && (
        <div
          onClick={() => {
            setSearchValue('')
          }}
          className={style.clearIcon}
        >
          <AiOutlineClear />
        </div>
      )}
    </div>
  )
}

export default Search
