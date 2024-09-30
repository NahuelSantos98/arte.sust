import { useParams } from 'react-router-dom';
import { data } from '../utils/data';
import style from './pagesStyle/artDetail.module.css';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import isotipo from '../utils/img/Isotipo-Final.jpg'
import Loading from '../components/loadingComponent/Loading'

const ArtDetail = () => {
    const { state } = useContext(LanguageContext);
    const isEnglish = state.language;
    const { id } = useParams();
    
    // // Estado para las imágenes cargadas
    // const [loadedImages, setLoadedImages] = useState({
    //     secondImage: false,
    //     thirdImage: false,
    //     fourthImage: false,
    //     fifthImage: false
    // });

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

    // const handleImageLoad = (imageName) => {
    //     setLoadedImages(prevState => ({
    //         ...prevState,
    //         [imageName]: true
    //     }));
    // };

    return (
        <section className={style.artDetailContainer}>
            <img
                src={fifthImage}
                className={style.pricipalImage}
                onClick={() => openModal(fifthImage)}
                alt={name}
            />

            <h2 className={style.detailTtile}>{name}</h2>
            <p  className={style.detailTechnique}>{isEnglish ? englishTechnique : technique}</p>
            <p>{size}</p>
            <p>${price} - {priceUsd} USD</p>
            <div className={style.secondaryImageContainer}>

                {/* {!loadedImages.secondImage && <div className={style.centerLoading}><Loading /></div>} */}
                <img
                    src={secondImage}
                    className={style.imageArt}
                    // style={{ display: loadedImages.secondImage ? 'block' : 'none' }}
                    onClick={() => openModal(secondImage)}
                    // onLoad={() => handleImageLoad('secondImage')}
                    alt="Second artwork"
                />
                
                {/* {!loadedImages.thirdImage && <div className={style.centerLoading}><Loading /></div>} */}
                <img
                    src={thirdImage}
                    className={style.imageArt}
                    // style={{ display: loadedImages.thirdImage ? 'block' : 'none' }}
                    onClick={() => openModal(thirdImage)}
                    // onLoad={() => handleImageLoad('thirdImage')}
                    alt="Third artwork"
                />
                
                {fourthImage && (
                    <>
                        {/* {!loadedImages.fourthImage && <div className={style.centerLoading}><Loading /></div>} */}
                        <img
                            src={fourthImage}
                            className={style.imageArt}
                            // style={{ display: loadedImages.fourthImage ? 'block' : 'none' }}
                            onClick={() => openModal(fourthImage)}
                            // onLoad={() => handleImageLoad('fourthImage')}
                            alt="Fourth artwork"
                        />
                    </>
                )}

                {/* {!loadedImages.fifthImage && <div className={style.centerLoading}><Loading /></div>} */}
                <img
                    src={principalImage}
                    className={style.imageArt}
                    // style={{ display: loadedImages.fifthImage ? 'block' : 'none' }}
                    onClick={() => openModal(principalImage)}
                    // onLoad={() => handleImageLoad('fifthImage')}
                    alt="Fifth artwork"
                />
            </div>
            <article className={style.descriptionDetailContainer}>
            <p>{isEnglish ? englishDescription : description}</p>
            </article>
        

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
