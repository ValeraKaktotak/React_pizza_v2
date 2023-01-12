import { Routes, Route } from 'react-router-dom'
import Header from 'components/Header'
import Home from 'components/pages/Home'
import Cart from 'components/pages/Cart'
import NotFound from 'components/pages/NotFound'
import 'scss/app.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
