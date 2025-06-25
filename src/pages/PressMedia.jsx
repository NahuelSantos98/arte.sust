import React, { useContext } from 'react';
import MediaList from '../components/mediaList/MediaList';
import styles from './pagesStyle/pressMedia.module.css';
import { LanguageContext } from '../context/languageContext';

const PressMedia = () => {
  const { state } = useContext(LanguageContext);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {state.language ? 'Press & Media' : 'Prensa y Medios'}
      </h1>
      <MediaList />
    </div>
  );
};

export default PressMedia;

