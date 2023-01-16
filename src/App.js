import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from 'components/Header'
import Home from 'components/pages/Home'
import Cart from 'components/pages/Cart'
import NotFound from 'components/pages/NotFound'
import 'scss/app.scss'

export const SearchContext = React.createContext('')

function App() {
  let [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
