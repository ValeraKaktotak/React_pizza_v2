import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        😕
        <br />
        <span>Ничего не найдено</span>
      </h1>
      <p className={styles.description}>
        К сожалению данной страницы нет в нашем интернет-магазине
      </p>
    </div>
  )
}

export default NotFoundBlock
