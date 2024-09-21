import {data} from '../utils/data'
import {Link} from 'react-router-dom'
import { routes } from '../utils/route'

const ArtWorksPage = () => {

  return (
    <div> 
      {data.map(obra=>(
        <Link to={`${routes.artDetail}${obra.id}`} key={obra.id}>
            <img src={obra.principalImage}  />
        </Link>
      ))}
    </div>
  )
}

export default ArtWorksPage