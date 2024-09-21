import style from './whatsapp.module.css'
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <>
        <a href='https://api.whatsapp.com/send?phone=5491161843236&text=Hola,%20Quería%20hacerte%20una%20consulta%20en%20relacion%20a%20tus%20obras.' target='_blank' className={style.btnWsp}>
            <FaWhatsapp/>
        </a>
    </>
  )
}

export default Whatsapp