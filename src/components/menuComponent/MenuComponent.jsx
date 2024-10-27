import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './menu.module.css';
import { routes } from '../../utils/route';
import { LanguageContext } from '../../context/languageContext';

const MenuComponent = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const { state, changeLanguageSpanish, changeLanguageEnglish } = useContext(LanguageContext)
  const isEnglish = state.language


  return (
    <>
      <div
        className={`${style.menu} ${showNav ? style.cross : ''}`}
        onClick={() => setShowNav(!showNav)}
      >
        <span className={style.span}></span>
        <span className={style.span}></span>
        <span className={style.span}></span>
      </div>

      <div className={`${style.sidebar} ${showNav ? style.open : ''}`}>
        <ul className={style.sidebarMenu}>
        <li className={location.pathname === routes.artwork ? style.selected : ''}>
            <Link to={routes.artwork}>{!isEnglish ? 'Obras' : 'Artwork'}</Link>
          </li>
          <li className={location.pathname === routes.faq ? style.selected : ''}>
            <Link to={routes.faq}>{!isEnglish ? 'Preguntas Frecuentes' : 'Frequently asked questions'}</Link>
          </li>
          <li className={location.pathname === routes.bio ? style.selected : ''}>
            <Link to={routes.bio}>{!isEnglish ? 'Biografía' : 'Biography'}</Link>
          </li>
          <li className={location.pathname === routes.contact ? style.selected : ''}>
            <Link to={routes.contact}>{!isEnglish ? 'Contacto' : 'Contact'}</Link>
          </li>
          <li className={style.changeLanguage} >
            <p onClick={changeLanguageSpanish}>ES <img
              src="https://flagcdn.com/w20/es.png"
              srcSet="https://flagcdn.com/w40/es.png 2x"
              width="20"
              alt="Spain"></img></p> | <p onClick={changeLanguageEnglish}>EN <img
                src="https://flagcdn.com/w20/us.png"
                srcSet="https://flagcdn.com/w40/us.png 2x"
                width="20"
                alt="United States"></img></p>
          </li>
        </ul>
      </div>

      {showNav && <div className={style.overlay} onClick={() => setShowNav(false)}></div>}
    </>
  );
};

export default MenuComponent;
