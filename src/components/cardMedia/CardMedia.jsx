import React, { useContext } from 'react';
import styles from './CardMedia.module.css';
import { LanguageContext } from '../../context/languageContext';

const CardMedia = ({ item }) => {
  const { state } = useContext(LanguageContext);

  const title = state.language ? item.title_en : item.title;
  const description = state.language ? item.description_en : item.description;
  const previewTitle = state.language ? item.preview?.title_en : item.preview?.title;
  const previewDescription = state.language ? item.preview?.description_en : item.preview?.description;

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>

      {item.type === 'youtube' && (
        <div className={styles.videoWrapper}>
          <iframe
            src={item.iframeSrc}
            title={title}
            allowFullScreen
          />
        </div>
      )}

      {item.type === 'link' && item.preview ? (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.linkPreview}>
          <img src={item.preview.image} alt={previewTitle} />
          <div className={styles.previewContent}>
            <h4>{previewTitle}</h4>
            <p>{previewDescription}</p>
          </div>
        </a>
      ) : item.type === 'link' && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {state.language ? 'Read more' : 'Ver más'}
        </a>
      )}
    </div>
  );
};

export default CardMedia;
