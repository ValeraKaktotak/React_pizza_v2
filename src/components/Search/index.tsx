import React, { useCallback, useRef, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineClear } from 'react-icons/ai'
import debounce from 'lodash.debounce'
import { changeSearchValue } from 'redux/slices/filterSlice'
import style from './Search.module.scss'
import { useAppDispatch } from 'redux/store'

const Search:React.FC = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const clearInput = () => {
    setInputValue('')
    dispatch(changeSearchValue(''))
    inputRef.current?.focus()
  }

  const debounceSearch = useCallback(
    debounce((value) => {
      dispatch(changeSearchValue(value))
    }, 300),
    [],
  )
  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    debounceSearch(event.target.value)
  }

  return (
    <div className={style.root}>
      <input
        ref={inputRef}
        onChange={changeSearch}
        className={style.input}
        placeholder="Pizza search..."
        value={inputValue}
      />
      <div className={style.icon}>
        <BiSearchAlt />
      </div>
      {inputValue && (
        <div onClick={clearInput} className={style.clearIcon}>
          <AiOutlineClear />
        </div>
      )}
    </div>
  )
}

export default Search
