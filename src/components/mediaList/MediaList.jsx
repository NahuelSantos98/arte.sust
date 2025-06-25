import React from 'react';
import CardMedia from '../cardMedia/CardMedia';
import { mediaPress } from '../../utils/mediaPress';

const MediaList = () => {
  return (
    <div>
      {mediaPress.map(item => (
        <CardMedia key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MediaList;
