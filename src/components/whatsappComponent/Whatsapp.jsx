import style from './whatsapp.module.css'
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <>
        <a href='https://api.whatsapp.com/send?phone=5491161843236&text=Hola,%20me%20gustaría%20hacerte%20una%20consulta%20sobre%20tus%20obras.' target='_blank' className={`${style.btnWsp} ${style.bounceTop}`}>
            <FaWhatsapp/>
        </a>
    </>
  )
}

export default Whatsapp;