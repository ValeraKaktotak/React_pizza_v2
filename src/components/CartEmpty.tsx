import { Link } from 'react-router-dom'
import emptyCartImg from 'assets/img/empty-cart.png'
import React, { useEffect, useRef } from 'react'
import { selectCart } from 'redux/slices/cartSlice'
import { useSelector } from 'react-redux'

const CartEmpty:React.FC = () => {

  //cart reducer
  const cartItems = useSelector(selectCart)

  // для localstorage
  useEffect(() => {
    const json = JSON.stringify(cartItems)
      localStorage.setItem('pizzaCart', json)
  }, [cartItems])

  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
