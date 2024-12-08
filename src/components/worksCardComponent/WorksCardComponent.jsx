import React, { useState } from 'react';
import Loading from '../loadingComponent/Loading'
import style from './worksCardComponent.module.css'

const WorksCardComponent = ({ item }) => {
  const { principalImage, name, small } = item;
  
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <div className={style.loadingDiv}><Loading /></div> }
      <img 
        src={principalImage} 
        style={{display: loading ? 'none' : 'block' }} 
        className={` ${style.imageArtwork} ${!small && `${style.shadow}`}`}
        onLoad={handleImageLoad} 
        alt={name}
      /> 
    </>
  );
};

export default WorksCardComponent;
