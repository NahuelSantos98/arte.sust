import ContactForm from "../components/contactFormComponent/ContactForm"
import style from './pagesStyle/contactPage.module.css'
import FotoContacto from '../utils/img/FotoContacto.jpeg'
import { useContext } from "react"
import { LanguageContext } from "../context/languageContext"

const ContactPage = () => {
  const { state } = useContext(LanguageContext)
  const isEnglish = state.language
  return (
    <div className={style.contactPageContainer}>
      <div className={style.imageAndTextContainer}>
        <img src={FotoContacto} alt="Foto Sabrina Sust" className={style.imageContact} />
        <div className={style.textContainerContact}>
          <h3>{isEnglish ? "Contact me!" : "Contactate conmigo!" }</h3>
          <p>{isEnglish ? 'After completing the form below, you will contact me and I would respond to you' : 'Al llenar el formulario vas a poder comunicarte conmigo y te respondere'} </p>
        </div>
      </div>


      <ContactForm />
    </div>
  )
}

export default ContactPage