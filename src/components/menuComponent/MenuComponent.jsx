import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './menu.module.css';
import { routes } from '../../utils/route';

const MenuComponent = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

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
          <li className={location.pathname === routes.bio ? style.selected : ''}>
            <Link to={routes.bio}>Bio</Link>
          </li>
          <li className={location.pathname === routes.artwork ? style.selected : ''}>
            <Link to={routes.artwork}>Obras</Link>
          </li>
          <li className={location.pathname === routes.faq ? style.selected : ''}>
            <Link to={routes.faq}>Preguntas Frecuentes</Link>
          </li>
          <li className={location.pathname === routes.contact ? style.selected : ''}>
            <Link to={routes.contact}>Contacto</Link>
          </li>
        </ul>
      </div>
      
      {showNav && <div className={style.overlay} onClick={() => setShowNav(false)}></div>}
    </>
  );
};

export default MenuComponent;
