import { useContext } from 'react'
import { LanguageContext } from '../context/languageContext'
import WorksListContainer from '../components/worksListContainer/WorksListContainer'
import style from './pagesStyle/artwork.module.css'

const ArtWorksPage = () => {

  const { state } = useContext(LanguageContext);
  const isEnglish = state.language;

  return (
    <>
    <div className={style.containerArtworkPage}> 
      <div className={style.textContainerArtWorkPage}> 
      <p className={style.invitationArtwork}>{isEnglish? "I invite you to surrender to the sensations and emotions, because with reliefs, textures, and the shine of certain metals, each piece is an experience and tells parts of my story." : "Te invito a que te entregues a las sensaciones y emociones porque con relieves,  texturas y el brillo de algunos metales cada obra es una experiencia y cuenta partes de mi historia."}</p>
      </div>
    </div>
    <WorksListContainer />
    </>
  )
}

export default ArtWorksPage;