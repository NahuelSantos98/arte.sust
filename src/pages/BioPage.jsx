import presentacion from '../utils/img/Presentacion2.jpeg'
import style from './pagesStyle/bioPage.module.css'
import useScreenSize from '../hooks/useScreenSize'

const BioPage = () => {

  const {width} = useScreenSize();
  


  return (
    <div className={style.bioPageContainer}>
      {width < 769 ? <img src={presentacion} alt='Presentacion Sabrina Sust' className={style.imgPresentacion} /> : null}
      <div className={style.textoBioPage}>
        <p>Esta soy yo, Sabrina Sust. Soy la artista detrás de cada obra.</p>
        <p>Descubrí mi amor por el arte hace muchos años, cuando entendí que con un pincel en mano soy mi versión más auténtica. Por muchos años hice obras a comisión, especializándome en retratos de clientes, famosos y retratos de mascotas. Hasta que un día entré en el maravilloso mundo del arte abstracto y fascinada me permití volcar en el lienzo mi esencia.</p>
        <p>En mis obras hay mucho de mí. En varias se refleja mi amor por el mar, sus formas y colores; así también como mi pasión por la luna y sus fases. Me gusta experimentar con texturas, relieves y el brillo de distintos metales. En definitiva, busco que todas mis obras sean provocadoras de sensaciones.</p>
        <p>Además de disfrutar del proceso creativo, también entendí la importancia de compartir las obras con otros, por lo que empecé a participar de muestras colectivas. Por el momento lo hice dos veces en Centro Cultura Viva y en Galería Zero168, experiencias que enriquecieron mucho mi crecimiento como artista, y me permitieron entender que compartir mi arte es una invitación a que mis obras sigan su camino. Después de todo, el arte es vida y de esta manera una parte de mi continúa viviendo en cada una de ellas.</p>
        <p>En ésta página podrás ver las obras realizadas y mi estilo creativo. Podes consultarme por cualquiera de las obras disponibles, y si resonas con alguna que no lo está podemos charlar para realizar una nueva en el estilo que te haya gustado y que combine con tu espacio.</p>
        <p>Te invito a conocerme a través de mi arte, que espero disfrutes tanto como lo hago yo.</p>
        <p className={style.nombreBio}>Saby</p>
      </div>
  </div>

  )
}

export default BioPage