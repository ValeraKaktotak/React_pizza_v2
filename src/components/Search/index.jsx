import { useDispatch, useSelector } from 'react-redux'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineClear } from 'react-icons/ai'
import { changeSearchValue } from 'redux/slices/searchSlice'
import style from './Search.module.scss'

function Search() {
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.searchReducer.searchValue)

  return (
    <div className={style.root}>
      <input
        onChange={(e) => {
          dispatch(changeSearchValue(e.currentTarget.value))
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
            dispatch(changeSearchValue(''))
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
