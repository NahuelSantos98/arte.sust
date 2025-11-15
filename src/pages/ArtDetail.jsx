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

    const searchedArt = artworkData.find(obra => obra.id == id);

    if (!searchedArt) {
        return <h2 className={style.notFound}>Obra no encontrada</h2>;
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
        triptico,
        priceMirror,
        price4,
        price4Mirror,
        sizeMirror
    } = searchedArt;

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
            <div className={style.textDetailContainer}>
            {priceWithDot && <p>{isEnglish? `Price ${price4 && "individual" || ""}: $${priceWithDot} (ARG)` : `Precio: $${priceWithDot} (ARG)`}</p>}
            {priceMirrorWithDot && <p>{isEnglish? "Price with mirror: $" + priceMirrorWithDot + " (ARG)" : "Precio con espejo: $" + priceMirrorWithDot + " (ARG)"}</p>}
            {price4WithDot && <p>{isEnglish? "Price for 4 artworks: $" + price4WithDot + " (ARG)" : "Precio 4 obras: $" + price4WithDot + " (ARG)"}</p>}
            {price4MirrorWithDot && <p>{isEnglish? "Price for 4 artworks with mirrors: $" + price4MirrorWithDot + " (ARG)" : "Precio 4 obras con espejo: $" + price4MirrorWithDot + " (ARG)"}</p>}
            <p className={style.detailTechnique}>{isEnglish ? englishTechnique : technique}</p>
            <p>{price4 && isEnglish? "Individual size: " : price4 && "Tamaño individual: " }{size}</p>
            {sizeMirror && <p>{isEnglish? "Size with mirror: " + sizeMirror : "Tamaño con espejo: " + sizeMirror}</p>}
            {triptico && <p>{isEnglish? "Complete triptic" : "Triptico completo"}: {triptico}</p>}
            </div>


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
