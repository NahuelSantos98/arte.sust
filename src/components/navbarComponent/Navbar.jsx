import MenuComponent from '../menuComponent/MenuComponent';
import style from '../navbarComponent/navbar.module.css'
import logo from '../../utils/img/IsoLogotipo-sinarte-Final.jpg'

const Navbar = () => {
  return (
    <div className={style.containerNavbar}>
      <div className={style.logoContainer}>
        <img src={logo} alt='Logo Sabrina Sust' className={style.imageLogo}/>
      </div>
      <div className={style.menuContainerNavbar}>
        <MenuComponent />
      </div>
    </div>
  );
};

export default Navbar;
