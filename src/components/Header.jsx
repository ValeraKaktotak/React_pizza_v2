import { Link } from 'react-router-dom'
import Search from 'components/Search'
import Cart from 'components/Cart'
import logo from 'assets/img/pizza-logo.svg'

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src={logo} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <Search />
        <Cart />
      </div>
    </div>
  )
}

export default Header
