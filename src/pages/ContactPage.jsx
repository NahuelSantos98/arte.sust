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
          <p>{isEnglish ? 'If you have any questions or inquiries, you can fill out the contact form, and I will get back to you shortly.' : 'Si tenés dudas/consultas podés completar el formulario y a la brevedad me pondré en contacto con vos.'} </p>
          <p className={style.thanksContact}>{isEnglish? 'Thanks!' : 'Gracias!'}</p>
        </div>
      </div>


      <ContactForm />
    </div>
  )
}

export default ContactPage