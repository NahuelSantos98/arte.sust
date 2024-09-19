import MenuComponent from '../menuComponent/MenuComponent';
import style from './navbar.module.css'

const Navbar = () => {

  return (
    <div className={style.navbarContainer}>
      <MenuComponent />
      <p>Logo</p>
    </div>
  );
};

export default Navbar;
