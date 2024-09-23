import style from './loading.module.css'

const Loading = () => {
  return (
    <div className={style.textLoading}>
      <p className={style.loading}>Loading</p>
      <div className={style.spinner}></div>
    </div>

  )
}

export default Loading
