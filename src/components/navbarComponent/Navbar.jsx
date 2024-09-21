import MenuComponent from '../menuComponent/MenuComponent';
import style from '../navbarComponent/navbar.module.css'
import logo from '../../utils/img/IsoLogotipo-sinarte-Final.jpg'
import { routes } from '../../utils/route';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={style.containerNavbar}>
      <div className={style.logoContainer}>
        <Link to={routes.bio}><img src={logo} alt='Logo Sabrina Sust' className={style.imageLogo}/></Link>
      </div>
      <div className={style.menuContainerNavbar}>
        <MenuComponent />
      </div>
    </div>
  );
};

export default Navbar;
