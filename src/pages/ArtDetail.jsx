import {useParams} from 'react-router-dom'
import {data} from '../utils/data'
import style from './pagesStyle/artDetail.module.css'

const ArtDetail = () => {
    const {id} = useParams()

    const searchedArt = data.find(obra=> obra.id === parseInt(id) )
    const {name, principalImage,secondImage, thirdImage,fourthImage, description, technique, price } = searchedArt
    console.log(searchedArt);
    

  return (
    <div  className={style.artDetailContainer}>
        <img src={principalImage}  className={style.pricipalImage}  />
        <h2>{name}</h2>
        <p>{technique}</p>
        <p>${price}</p>
        <div className={style.secondaryImageContainer}>
            <img src={secondImage} className={style.imageArt} />
            <img src={thirdImage} className={style.imageArt}  />
            <img src={fourthImage} className={style.lastImageArt} />
        </div>
        <p>{description}</p>
    </div>
  )
}

export default ArtDetail