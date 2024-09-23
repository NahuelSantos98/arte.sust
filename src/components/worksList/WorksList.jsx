import { data } from "../../utils/data"
import {routes} from '../../utils/route'
import {Link} from 'react-router-dom'
import WorksCardComponent from "../worksCardComponent/WorksCardComponent"
import style from './worksList.module.css'

const WorksList = () => {
  return (
    <div className={style.worksListContainer}>
        {data.map(item=>(
            <Link to={`${routes.artDetail}${item.id}`} key={item.id} className={style.linkWorkList}>
                <WorksCardComponent item={item}  />
            </Link>
        ))}
    </div>
  )
}

export default WorksList