import  imagenBio2 from '../utils/img/Imagen Bio 2.jpeg';
import style from './pagesStyle/bioPage.module.css';
import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { bioContent } from '../utils/diffLanguages';

const BioPage = () => {
  const { state } = useContext(LanguageContext);
  const isEnglish = state.language;


  return (
    <div className={style.bioPageContainer}>
      <img src={imagenBio2} alt='Presentacion Sabrina Sust' className={style.imgPresentacion} />
      <div className={style.textoBioPage}>
        {bioContent[isEnglish ? 'english' : 'spanish'].map((text, index) => ( 
          <p key={index}>{text}</p>
        ))}
        <p className={style.nombreBio}>Saby</p>
      </div>
    </div>
  );
}

export default BioPage;
