import { useParams } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <div className="container">
      <h2>Pizza page</h2>
      <img src="#" alt="" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores impedit maiores sit, neque voluptas suscipit
        nam eveniet, mollitia, fugiat molestias similique nisi molestiae! Hic provident totam mollitia perferendis unde
        ipsam.
      </p>
    </div>
  )
}

export default FullPizza
