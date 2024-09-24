import {useContext} from 'react'
import style from './footer.module.css'
import isotipo from '../../utils/img/Isotipo-Final.jpg'
import { LuInstagram } from "react-icons/lu";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import {LanguageContext} from '../..//context/languageContext'

const Footer = () => {

  const {state} = useContext(LanguageContext)
  const isEnglish = state.language

  return (
    <div className={style.footerContainer}>
      <div className={style.footerInfoContainer}>
        <section className={style.isotipoFooterContainer}>
          <img src={isotipo} alt="Isotipo Sabrina Sust" className={style.isotipoFooter} />
        </section>

        <section className={style.iconsFooter}>
          <div className={style.linkFooter}><a href="https://www.instagram.com/arte.sust/"><LuInstagram /></a></div>
          <div className={style.linkFooter}><a href="https://www.tiktok.com/@arte.sust"><FaTiktok /></a></div>
          <div className={style.linkFooter}><a href="https://www.facebook.com/profile.php?id=61563871320943"><FaFacebookF /></a></div>
        </section>


        <section className={style.infoFooter}>
          <p>sabysust@gmail.com</p>
          <p>+54 9 11 6184-3236 </p>
        </section>
      </div>

      <div className={style.copyrightThanks}>
        <p className={style.copyright}>© Copyright 2024 Sabrina Laura Sust. All rights reserved.</p>
        {isEnglish? <p className={style.copyright}>Design: Percepto, Programming: Nahuel Santos</p> : <p className={style.copyright}>Diseño: Percepto, Programación: Nahuel Santos</p>}
      </div>
    </div>


  )
}

export default Footer