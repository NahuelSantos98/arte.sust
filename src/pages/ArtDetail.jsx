import {useParams} from 'react-router-dom'
import {data} from '../utils/data'
import style from './pagesStyle/artDetail.module.css'
import { useContext } from 'react'
import {LanguageContext} from '../context/languageContext'

const ArtDetail = () => {
    const {state} = useContext(LanguageContext)
    const isEnglish = state.language
    const {id} = useParams()

    const searchedArt = data.find(obra=> obra.id === parseInt(id) )
    const {name, principalImage,secondImage, thirdImage,fourthImage, description, technique, price, englishDescription, englishTechnique, fifthImage, size, priceUsd } = searchedArt

  return (
    <div  className={style.artDetailContainer}>
        <img src={principalImage}  className={style.pricipalImage}  />
        <h2>{name}</h2>
        <p>{isEnglish ? englishTechnique : technique}</p>
        <p>{size}</p>
        <p>${price} - {priceUsd}USD</p>
        <div className={style.secondaryImageContainer}>
            <img src={secondImage} className={style.imageArt} />
            <img src={thirdImage} className={style.imageArt}  />
            <img src={fourthImage} className={style.lastImageArt} />
            <img src={fifthImage} className={style.lastImageArt} />
        </div>
        <p className={style.descriptionArt}>{isEnglish ? englishDescription : description}</p>
    </div>
  )
}

export default ArtDetail