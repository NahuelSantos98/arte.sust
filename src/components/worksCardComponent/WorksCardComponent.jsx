import React, { useState } from 'react';
import Loading from '../loadingComponent/Loading'

const WorksCardComponent = ({ item }) => {
  const { principalImage, name, fifthImage } = item;
  
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loading /> }
      <img 
        src={principalImage} 
        style={{ width: '20rem', height: '20rem', display: loading ? 'none' : 'block' }} 
        onLoad={handleImageLoad} 
        alt={name}
      /> 
    </div>
  );
};

export default WorksCardComponent;
