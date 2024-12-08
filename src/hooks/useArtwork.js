import { useContext } from "react";
import { ArtworkContext } from "../context/artworkContext";

export const useArtwork = () => {
    const context = useContext(ArtworkContext);
    if (!context) {
        throw new Error('useArtwork debe usarse dentro de un ArtworkProvider');
    }
    return context;
};