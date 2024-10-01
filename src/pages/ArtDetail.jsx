import { useParams } from 'react-router-dom';
import { data } from '../utils/data';
import style from './pagesStyle/artDetail.module.css';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import isotipo from '../utils/img/Isotipo-Final.jpg';
import Loading from '../components/loadingComponent/Loading';

const ArtDetail = () => {
    const { state } = useContext(LanguageContext);
    const isEnglish = state.language;
    const { id } = useParams();
    
    const searchedArt = data.find(obra => obra.id === parseInt(id));
    const {
        name,
        principalImage,
        secondImage,
        thirdImage,
        fourthImage,
        description,
        technique,
        price,
        englishDescription,
        englishTechnique,
        fifthImage,
        size,
        priceUsd,
    } = searchedArt;

    // Array con todas las imágenes para navegar
    const images = [principalImage, secondImage, thirdImage, fourthImage, fifthImage].filter(Boolean);

    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (image) => {
        const index = images.indexOf(image);
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const showNextImage = (e) => {
        e.stopPropagation(); 
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    };

    const showPreviousImage = (e) => {
        e.stopPropagation(); 
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    };

    return (
        <section className={style.artDetailContainer}>
            <img
                src={fifthImage}
                className={style.pricipalImage}
                onClick={() => openModal(fifthImage)}
                alt={name}
            />

            <h2 className={style.detailTtile}>{name}</h2>
            <p className={style.detailTechnique}>{isEnglish ? englishTechnique : technique}</p>
            <p>{size}</p>
            <p>${price} - {priceUsd} USD</p>
            <div className={style.secondaryImageContainer}>
                <img
                    src={secondImage}
                    className={style.imageArt}
                    onClick={() => openModal(secondImage)}
                    alt="Second artwork"
                />
                
                <img
                    src={thirdImage}
                    className={style.imageArt}
                    onClick={() => openModal(thirdImage)}
                    alt="Third artwork"
                />
                
                {fourthImage && (
                    <img
                        src={fourthImage}
                        className={style.imageArt}
                        onClick={() => openModal(fourthImage)}
                        alt="Fourth artwork"
                    />
                )}

                <img
                    src={principalImage}
                    className={style.imageArt}
                    onClick={() => openModal(principalImage)}
                    alt="Principal artwork"
                />
            </div>
            <article className={style.descriptionDetailContainer}>
                <p>{isEnglish ? englishDescription : description}</p>
            </article>

            {selectedImage && (
                <article className={style.modalOverlay} onClick={closeModal}>
                    <button onClick={showPreviousImage} className={style.prevButton}>◀</button>
                    <img src={selectedImage} className={style.modalImage} alt="Selected Image" />
                    <button onClick={showNextImage} className={style.nextButton}>▶</button>
                </article>
            )}
        </section>
    );
};

export default ArtDetail;
