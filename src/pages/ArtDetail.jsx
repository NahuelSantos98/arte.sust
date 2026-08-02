import { useParams } from 'react-router-dom';
import { useArtwork } from '../hooks/useArtwork';
import style from './pagesStyle/artDetail.module.css';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const imageFieldOrder = {
    principalImage: 0,
    secondImage: 1,
    thirdImage: 2,
    fourthImage: 3,
    fifthImage: 4,
    sixthImage: 5,
    seventhImage: 6,
    eighthImage: 7,
    ninthImage: 8,
    tenthImage: 9,
};

const getArtworkImages = (artwork) => {
    if (Array.isArray(artwork.images) && artwork.images.length) {
        return artwork.images.filter(Boolean);
    }

    return Object.entries(artwork)
        .filter(([key, value]) => key.endsWith('Image') && value)
        .sort(([keyA], [keyB]) => {
            const orderA = imageFieldOrder[keyA] ?? Number.MAX_SAFE_INTEGER;
            const orderB = imageFieldOrder[keyB] ?? Number.MAX_SAFE_INTEGER;

            if (orderA !== orderB) return orderA - orderB;
            return keyA.localeCompare(keyB);
        })
        .map(([, value]) => value);
};

const ArtDetail = () => {
    const { state } = useContext(LanguageContext);
    const artworkData = useArtwork();
    const isEnglish = state.language;
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const searchedArt = artworkData.find(obra => obra.id == id);
    const images = useMemo(() => searchedArt ? getArtworkImages(searchedArt) : [], [searchedArt]);
    const coverImage = images[0];
    const hasMultipleImages = images.length > 1;
    const backLabel = isEnglish ? "Back" : "Volver";

    const {
        name,
        description,
        technique,
        englishDescription,
        englishTechnique,
        size,
        price, 
        priceUsd,
        dispo,
        small,
        triptico,
        priceMirror,
        price4,
        price4Mirror,
        sizeMirror
    } = searchedArt || {};

    const descriptionText = isEnglish ? englishDescription : description;
    const techniqueText = isEnglish ? englishTechnique : technique;

    const formatPrice = (value) => {
        if (value === null || value === undefined) return null;
        const numericValue = typeof value === 'number' ? value : Number(value);
        if (Number.isNaN(numericValue)) return null;
        return numericValue.toLocaleString('de-DE');
    };

    const priceWithDot = formatPrice(price);
    const priceMirrorWithDot = formatPrice(priceMirror);
    const price4WithDot = formatPrice(price4);
    const price4MirrorWithDot = formatPrice(price4Mirror);
    const priceUsdWithDot = formatPrice(priceUsd);

    const openModal = useCallback((index) => {
        const image = images[index];
        if (!image) return;

        setSelectedImage(image);
        setCurrentIndex(index);
    }, [images]);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const showNextImage = useCallback((e) => {
        e?.stopPropagation();
        if (!hasMultipleImages) return;

        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    }, [currentIndex, hasMultipleImages, images]);

    const showPreviousImage = useCallback((e) => {
        e?.stopPropagation();
        if (!hasMultipleImages) return;

        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    }, [currentIndex, hasMultipleImages, images]);

    useEffect(() => {
        if (!selectedImage) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeModal();
            if (event.key === 'ArrowRight') showNextImage();
            if (event.key === 'ArrowLeft') showPreviousImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, closeModal, showNextImage, showPreviousImage]);

    if (!searchedArt) {
        return <h2 className={style.notFound}>{isEnglish ? "Artwork not found" : "Obra no encontrada"}</h2>;
    }

    return (
        <section className={style.artDetailContainer}>

            <button
                type="button"
                className={style.goBackDetail}
                onClick={() => navigate(-1)}
                aria-label={backLabel}
            >
                <span className={style.arrowIcon}><TiArrowBack /></span>{backLabel}
            </button>

            <div className={style.detailHeader}>
                <p className={style.eyebrow}>{isEnglish ? "Original artwork" : "Obra original"}</p>
                <h2 className={style.detailTtile}>{name}</h2>
            </div>

            {!dispo && (
                <div className={style.soldContainer}>
                    <span className={style.circleSold}></span>
                    <p className={style.dispo}>{isEnglish ? "Sold" : "Vendido"}</p>
                </div>
            )}

            <div className={style.detailLayout}>
                <div className={style.galleryPanel}>
                    <button
                        type="button"
                        className={style.mainImageButton}
                        onClick={() => openModal(0)}
                        aria-label={isEnglish ? `Open ${name} image` : `Abrir imagen de ${name}`}
                    >
                        <img
                            src={coverImage}
                            className={style.pricipalImage}
                            alt={name}
                        />
                    </button>

                    {hasMultipleImages && (
                        <div className={style.secondaryImageContainer} aria-label={isEnglish ? "Artwork images" : "Imágenes de la obra"}>
                            {images.map((image, index) => (
                                <button
                                    type="button"
                                    key={`${image}-${index}`}
                                    className={style.thumbnailButton}
                                    onClick={() => openModal(index)}
                                    aria-label={isEnglish ? `Open image ${index + 1}` : `Abrir imagen ${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        className={style.imageArt}
                                        alt={`${name} ${index + 1}`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={style.infoPanel}>
                    <div className={style.textDetailContainer}>
                    {/* {priceWithDot && <p>{isEnglish ? `Price${price4 ? " individual" : ""}: $${priceWithDot} (ARG)` : `Precio${price4 ? " individual" : ""}: $${priceWithDot} (ARG)`}</p>} */}
                    {/* {priceMirrorWithDot && <p>{isEnglish ? `Price with mirror: $${priceMirrorWithDot} (ARG)` : `Precio con espejo: $${priceMirrorWithDot} (ARG)`}</p>} */}
                    {/* {price4WithDot && <p>{isEnglish ? `Price for 4 artworks: $${price4WithDot} (ARG)` : `Precio 4 obras: $${price4WithDot} (ARG)`}</p>} */}
                    {/* {price4MirrorWithDot && <p>{isEnglish ? `Price for 4 artworks with mirrors: $${price4MirrorWithDot} (ARG)` : `Precio 4 obras con espejo: $${price4MirrorWithDot} (ARG)`}</p>} */}
                    {/* {priceUsdWithDot && <p>{isEnglish ? `Price: USD ${priceUsdWithDot}` : `Precio: USD ${priceUsdWithDot}`}</p>} */}
                    <p className={style.detailTechnique}>{techniqueText}</p>
                    {size && <p><strong>{price4 ? (isEnglish ? "Individual size:" : "Tamaño individual:") : (isEnglish ? "Size:" : "Tamaño:")}</strong> {size}</p>}
                    {sizeMirror && <p><strong>{isEnglish ? "Size with mirror:" : "Tamaño con espejo:"}</strong> {sizeMirror}</p>}
                    {triptico && <p><strong>{isEnglish ? "Complete triptych:" : "Tríptico completo:"}</strong> {triptico}</p>}
                    </div>

                    {descriptionText && (
                        <article className={style.descriptionDetailContainer}>
                            <p>{descriptionText}</p>
                        </article>
                    )}
                </div>
            </div>

            <button
                type="button"
                className={style.linkArtworkDetail}
                onClick={() => navigate(-1)}
            >
                <span className={style.arrowIcon}><TiArrowBack /></span>{backLabel}
            </button>

            {selectedImage && (
                <article
                    className={style.modalOverlay}
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={isEnglish ? `${name} image viewer` : `Visor de imágenes de ${name}`}
                >
                    {hasMultipleImages && (
                        <button type="button" onClick={showPreviousImage} className={style.prevButton} aria-label={isEnglish ? "Previous image" : "Imagen anterior"}><IoMdArrowRoundBack /></button>
                    )}
                    <img src={selectedImage} className={style.modalImage} alt={`${name} ${currentIndex + 1}`} onClick={(event) => event.stopPropagation()} />
                    {hasMultipleImages && (
                        <button type="button" onClick={showNextImage} className={style.nextButton} aria-label={isEnglish ? "Next image" : "Imagen siguiente"}><IoMdArrowRoundForward /></button>
                    )}
                    <button type="button" className={style.crossCloseModal} onClick={closeModal} aria-label={isEnglish ? "Close image viewer" : "Cerrar visor de imágenes"}><CgClose /></button>
                    {hasMultipleImages && (
                        <p className={style.imageCounter}>{currentIndex + 1} / {images.length}</p>
                    )}
                </article>
            )}
        </section>
    );
};

export default ArtDetail;
