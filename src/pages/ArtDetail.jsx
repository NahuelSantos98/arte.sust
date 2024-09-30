import { useParams } from 'react-router-dom';
import { data } from '../utils/data';
import style from './pagesStyle/artDetail.module.css';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import isotipo from '../utils/img/Isotipo-Final.jpg'

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

    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section className={style.artDetailContainer}>
            <img
                src={principalImage}
                className={style.pricipalImage}
                onClick={() => openModal(principalImage)}
                alt={name}
            />
            <h2>{name}</h2>
            <p>{isEnglish ? englishTechnique : technique}</p>
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
                    src={fifthImage}
                    className={style.imageArt}
                    onClick={() => openModal(fifthImage)}
                    alt="Fifth artwork"
                />
            </div>
            <p className={style.descriptionArt}>{isEnglish ? englishDescription : description}</p>

            {selectedImage && (
                <article className={style.modalOverlay} onClick={closeModal}>
                    <img src={selectedImage} className={style.modalImage} alt="Selected Image" />
                    {/* <img src={isotipo} alt='Isotipo' className={style.logoIsotipo}/> */}
                </article>
            )}
        </section>
    );
};

export default ArtDetail;
