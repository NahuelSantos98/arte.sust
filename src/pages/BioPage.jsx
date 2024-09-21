import presentacion from '../utils/img/Presentacion2.jpeg';
import style from './pagesStyle/bioPage.module.css';
import useScreenSize from '../hooks/useScreenSize';
import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { bioContent } from '../utils/diffLanguages';

const BioPage = () => {
  const { width } = useScreenSize();
  const { state } = useContext(LanguageContext);
  const isEnglish = state.language;


  return (
    <div className={style.bioPageContainer}>
      {width < 769 && <img src={presentacion} alt='Presentacion Sabrina Sust' className={style.imgPresentacion} />}
      <div className={style.textoBioPage}>
        {/* Selecciona cual array agarra. Se usa corchetes para manejar mejor flexibilidad y manejo de booleano */}
        {bioContent[isEnglish ? 'english' : 'spanish'].map((text, index) => ( 
          <p key={index}>{text}</p>
        ))}
        <p className={style.nombreBio}>Saby</p>
      </div>
    </div>
  );
}

export default BioPage;
