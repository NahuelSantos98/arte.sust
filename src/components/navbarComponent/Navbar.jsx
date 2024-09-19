import MenuComponent from '../menuComponent/MenuComponent';
import style from '../navbarComponent/navbar.module.css'

const Navbar = () => {

  return (
    <div className={style.containeNavbar}>
    <div className={style.menuContainerNavbar}>
      <MenuComponent />
    </div>
    <div className={style.logoContainer}>
      <p>Logo</p>
    </div>
    </div>
  );
};

export default Navbar;
