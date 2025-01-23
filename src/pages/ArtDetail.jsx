import { useParams } from 'react-router-dom';
import { useArtwork } from '../hooks/useArtwork';
import style from './pagesStyle/artDetail.module.css';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const ArtDetail = () => {
    const { state } = useContext(LanguageContext);
    const artworkData = useArtwork();
    const isEnglish = state.language;
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const searchedArt = artworkData.find(obra => obra.id == parseInt(id));

    if (!searchedArt) {
        return <h2>Obra no encontrada</h2>;
    }

    const {
        name,
        principalImage,
        secondImage,
        thirdImage,
        fourthImage,
        fifthImage,
        description,
        technique,
        englishDescription,
        englishTechnique,
        size,
        price, 
        priceUsd,
        dispo,
        small,
        triptico
    } = searchedArt;

    const images = !small
        ? [principalImage, secondImage, thirdImage, fourthImage, fifthImage].filter(Boolean)
        : [];

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
                src={small ? principalImage : fifthImage}
                className={style.pricipalImage}
                onClick={() => small || !fifthImage ? null : openModal(fifthImage)}
                alt={name}
            />
            
            <div
                className={style.goBackDetail}
                onClick={() => navigate(-1)}
            >
                <span className={style.arrowIcon}><TiArrowBack /></span>Volver
            </div>

            <h2 className={style.detailTtile}>{name}</h2>

            {!dispo && (
                <div className={style.soldContainer}>
                    <span className={style.circleSold}></span>
                    <p className={style.dispo}>{isEnglish ? "Sold" : "Vendido"}</p>
                </div>
            )}
            {priceUsd && <p>{isEnglish? `` : `Precio: $${price}`}</p>}
            <p className={style.detailTechnique}>{isEnglish ? englishTechnique : technique}</p>
            <p>{size}</p>
            {triptico && <p>{isEnglish? "Complete triptic" : "Triptico completo"}: {triptico}</p>}

            {!small && (
                <div className={style.secondaryImageContainer}>
                    {images.slice(0, 4).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className={style.imageArt}
                            onClick={() => openModal(image)}
                            alt={`Artwork ${index + 1}`}
                        />
                    ))}
                </div>
            )}
            
            <article className={style.descriptionDetailContainer}>
                {description && <p>{isEnglish ? englishDescription : description}</p>}
            </article>

            <div
                className={style.linkArtworkDetail}
                onClick={() => navigate(-1)}
            >
                <h3>
                    <span className={style.arrowIcon}><TiArrowBack /></span>Volver
                </h3>
            </div>

            {selectedImage && (
                <article className={style.modalOverlay} onClick={closeModal}>
                    <button onClick={showPreviousImage} className={style.prevButton}><IoMdArrowRoundBack /></button>
                    <img src={selectedImage} className={style.modalImage} alt="Selected Image" />
                    <button onClick={showNextImage} className={style.nextButton}><IoMdArrowRoundForward /></button>
                    <span className={style.crossCloseModal} onClick={closeModal}><CgClose /></span>
                </article>
            )}
        </section>
    );
};

export default ArtDetail;
