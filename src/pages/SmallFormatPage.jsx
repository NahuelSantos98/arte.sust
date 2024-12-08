import React, {useContext} from 'react'
import { LanguageContext } from '../context/languageContext'
import WorksListContainer from '../components/worksListContainer/WorksListContainer'
import { smallFormat } from '../utils/dataArtWork/smallFormat'
import style from './pagesStyle/smallFormat.module.css'

const SmallFormatPage = () => {
  const { state } = useContext(LanguageContext);
  const isEnglish = state.language;
  return (
    <div className={style.smallFormatTitle}>
      <h1>{isEnglish ? 'Small-Format Artwork' : 'Obras en formato pequeño' }</h1>
        <WorksListContainer data={smallFormat}/>
    </div>
  )
}

export default SmallFormatPage