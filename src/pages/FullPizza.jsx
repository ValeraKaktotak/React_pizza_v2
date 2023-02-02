import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(`https://63be806cf5cfc0949b58f105.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Sorry something wrong happens')
        navigate('/')
      }
    }
    getPizza()
  }, [])

  if (!pizza) {
    return (
      <div className="container fullPizza">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="container fullPizza">
      <h2 className="fullPizza__title">{pizza.title}</h2>
      <img className="fullPizza__img" src={pizza.imageUrl} alt="pizza" />
      <p className="fullPizza__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores impedit maiores sit, neque voluptas suscipit
        nam eveniet, mollitia, fugiat molestias similique nisi molestiae! Hic provident totam mollitia perferendis unde
        ipsam.
      </p>
      <h2 className="fullPizza__price">{pizza.price} руб.</h2>
      <Link className="fullPizza__button" to="/">
        Go Home
      </Link>
    </div>
  )
}

export default FullPizza
