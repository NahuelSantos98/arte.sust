import {useContext} from 'react'
import {LanguageContext} from '../context/languageContext'
import {faq} from '../utils/faq'
import {Link} from 'react-router-dom'
import {routes} from '../utils/route'
import style from './pagesStyle/faqPage.module.css'
import { TiArrowForward } from "react-icons/ti";

const FaQPage = () => {
  const {state} = useContext(LanguageContext)
  const isEnglish = state.language

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - (window.innerHeight / 2) + (element.offsetHeight / 2);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  

  return (
    <div className={style.faqContainer}>
      <section className={style.cardQuestions}>
        <h3>{isEnglish? "Questions" : "Preguntas"}</h3>
        <article className={style.containerPreguntas}>
          <ul className={style.listQuestions}>
            {faq.map(faq => (
              <li key={faq.id} onClick={() => handleScroll(faq.id)} className={style.questionItem}>
                {isEnglish ? faq.questionEnglish : faq.question}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={style.questionAnswerContainer}>
        {faq.map(faq => (
          <div key={faq.id} id={`${faq.id}`} className={style.infoQuestion}>
            <h3>{isEnglish ? faq.questionEnglish : faq.question}</h3>
            <p>{isEnglish ? faq.answerEnglish : faq.answer}</p>
          </div>
        ))}
        
        <article className={style.contactArticle}>
        <Link to={routes.contact} className={style.linkToContact}><p>{isEnglish? "If you have any other questions, feel free to contact me." : "Si tenés alguna otra consulta no dudes en contactarme."}<span><TiArrowForward /></span></p></Link>
        </article>
       
      </section>
    </div>
  )
}

export default FaQPage
